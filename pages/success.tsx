import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import BagContext from '@context/BagContext';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { putData } from '@utils/fetcher';
import { Profile } from '@types';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { FiCheckCircle } from 'react-icons/fi';
import Loader from 'react-loader-spinner';

import { colors } from '@utils/themes';
import GlobalStyles from '@styles/GlobalStyles';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SuccessPage() {
  const router = useRouter();
  const { user } = useUser();
  const [userID, setUserID] = useState('');
  const [purchases, setPurchases] = useState([]);
  const [mercadopagoPayments, setMercadopagoPayments] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const { data: profile } = useSWR<Profile>(userID ? `/api/user/${userID}` : null, fetcher);
  const { data: preference } = useSWR(
    profile ? `/api/mercadopago/get_preference/?preferenceId=${router.query.preference_id}` : null,
    fetcher,
  );
  const { data: dbUpdated } = useSWR(shouldUpdate ? 'updateUser' : null, () =>
    putData(`/api/user/${userID}`, { purchases, mercadopagoPayments }),
  );

  const { cleanBag } = useContext(BagContext);

  useEffect(() => {
    if (user) {
      cleanBag();
      setUserID(user.sub.slice(6, user.sub.length));
    }
  }, [user]);

  useEffect(() => {
    if (profile && preference) {
      const newPurchases = preference.items.map((item) => item.id);
      const updatedPurchases = profile.purchases.map((item) => item);
      const updatedMercadopagoPayments = profile.mercadopagoPayments.map((obj) => obj);

      for (const id of newPurchases) {
        updatedPurchases.unshift(id);
      }
      // @ts-ignore
      updatedMercadopagoPayments.unshift({ items: newPurchases, payment: router.query.payment_id });

      setPurchases(updatedPurchases);
      setMercadopagoPayments(updatedMercadopagoPayments);
      setShouldUpdate(true);
    }
  }, [profile, preference]);

  if (!dbUpdated) {
    return (
      <div className="loader-container">
        <div className="loader">
          <Loader type="TailSpin" color={colors.primaryStrong} height={100} width={100} />
          <GlobalStyles />
        </div>
      </div>
    );
  }

  if (dbUpdated) {
    return (
      <>
        <Alert variant="success">
          <FiCheckCircle />
          <span className="ml-2 font-weight-bold">Pago aprobado.</span>
        </Alert>
        <Container fluid>
          <h3>¡Gracias por tu compra!</h3>
          <p>
            Podrás visualizar en{' '}
            <Link href="/profile">
              <a className="font-weight-bold">tu perfil</a>
            </Link>{' '}
            todos los patrones adquiridos.{' '}
            <span className="font-weight-bold">¡Happy knitting!</span>
          </p>
        </Container>
        <GlobalStyles />

        <style jsx>{`
          .loader-container {
            position: fixed;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.2);
            z-index: 2999;
            padding: 0;
          }
          .loader {
            position: fixed;
            z-index: 3000;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        `}</style>
      </>
    );
  }
}
