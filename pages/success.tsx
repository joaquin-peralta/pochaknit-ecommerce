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
  const [preferences, setPreferences] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const { cleanBag } = useContext(BagContext);
  const { data: profile } = useSWR<Profile>(userID ? `/api/user/${userID}` : null, fetcher);
  const { data: dbUpdate } = useSWR(
    shouldUpdate ? 'updateDatabase' : null,
    () => putData(`/api/user/${userID}`, { purchases, mercadopago: preferences, tempPurchase: [] }),
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  useEffect(() => {
    if (user) {
      cleanBag();
      setUserID(user.sub.slice(6, user.sub.length));
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      const updatedPurchase = profile.purchases.map((item) => item);
      const updatedPreference = profile.mercadopago.map((item) => item);

      for (const id of profile.tempPurchase) {
        updatedPurchase.unshift(id);
      }
      // @ts-ignore
      updatedPreference.unshift(router.query.preference_id);

      setPurchases(updatedPurchase);
      setPreferences(updatedPreference);

      setShouldUpdate(true);
    }
  }, [profile]);

  if (!dbUpdate) {
    return (
      <div className="loader-container">
        <div className="loader">
          <Loader type="TailSpin" color={colors.primaryStrong} height={100} width={100} />
        </div>
      </div>
    );
  }

  if (dbUpdate) {
    return (
      <Container fluid>
        <h2>¡Gracias por tu compra!</h2>
        <Alert variant="success">
          <FiCheckCircle />
          <span className="ml-2 font-weight-bold">Pago aprobado</span>
        </Alert>
        <p>
          Podrás visualizar en{' '}
          <Link href="/profile">
            <a>tu perfil</a>
          </Link>{' '}
          todos los patrones adquiridos. <span className="font-weight-bold">¡Happy knitting!</span>
        </p>
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
      </Container>
    );
  }
}
