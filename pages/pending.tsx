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
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Loader from 'react-loader-spinner';
import { colors } from '@utils/themes';
import GlobalStyles from '@styles/GlobalStyles';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const fetchWithBody = (url: string, param) =>
  fetch(url, {
    body: JSON.stringify({ preference_id: param }),
  }).then((res) => res.json());

export default function PendingPage() {
  const router = useRouter();
  const { user } = useUser();
  const [userID, setUserID] = useState('');
  const [pendingPurchases, setPendingPurchases] = useState([]);
  const [mercadopagoPayments, setMercadopagoPayments] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const { data: profile } = useSWR<Profile>(userID ? `/api/user/${userID}` : null, fetcher);
  const { data: preference } = useSWR(router.query ? '/api/mercadopago/get_preference' : null, () =>
    fetchWithBody('/api/mercadopago/get_preference', router.query.preference_id),
  );
  const { data: dbUpdated } = useSWR(shouldUpdate ? `/api/user/${userID}` : null, () =>
    putData(`/api/user/${userID}`, { pendingPurchases, mercadopagoPayments }),
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
      const newPendingPurchases = preference.items.map((item) => item._id);
      const updatedPendingPurchases = profile.purchases.map((item) => item);
      const updatedMercadopagoPayments = profile.mercadopagoPayments.map((obj) => obj);

      for (const id of newPendingPurchases) {
        updatedPendingPurchases.unshift(id);
      }
      updatedMercadopagoPayments.unshift({
        items: newPendingPurchases,
        // @ts-ignore
        payment: router.query.payment_id,
      });

      setPendingPurchases(updatedPendingPurchases);
      setMercadopagoPayments(updatedMercadopagoPayments);
      setShouldUpdate(true);
    }
  }, [profile, preference]);

  if (!dbUpdated) {
    return (
      <div className="loader-container">
        <div className="loader">
          <Loader type="TailSpin" color={colors.primaryStrong} height={100} width={100} />
        </div>
      </div>
    );
  }

  if (dbUpdated) {
    return (
      <>
        <Alert variant="warning">
          <AiOutlineInfoCircle />
          <span className="ml-2 font-weight-bold">Pago pendiente.</span>
        </Alert>
        <Container fluid>
          <h3>Ya casi...</h3>
          <p>
            Mercadopago está procesando tu pago. ¡Cuando se apruebe se habilitará el patrón en tu{' '}
            <Link href="/profile">
              <a className="font-weight-bold">perfil</a>
            </Link>
            !
          </p>
          <p>
            Ante cualquier duda o inconveniente no dudes en enviarnos un mail a{' '}
            <strong>pochaknit@gmail.com</strong>
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
