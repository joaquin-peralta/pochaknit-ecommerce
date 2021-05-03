import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import BagContext from '@context/BagContext';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { putData } from '@utils/fetcher';
import { Profile } from '@types';
import Alert from 'react-bootstrap/Alert';
import { FiCheckCircle } from 'react-icons/fi';
import GlobalStyles from '@styles/GlobalStyles';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SuccessPage() {
  const router = useRouter();
  const { user } = useUser();
  const [userID, setUserID] = useState('');
  const [updated, setUpdated] = useState(false);
  const { cleanBag } = useContext(BagContext);
  const { data: profile } = useSWR<Profile>(userID ? `/api/user/${userID}` : null, fetcher);
  /* const { data: dbUpdate } = useSWR(shouldUpdate ? `/api/user/${userID}` : null, () =>
    putData(`/api/user/${userID}`, {
      purchases: ['TEST-PURCHASE'],
      mercadopago: ['TEST-PREFERENCE'],
      tempPurchase: [],
    }),
  ); */

  const dbUpdate = (url: string, { ...params }) =>
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => setUpdated(true))
      .catch((err) => console.error(err));

  useEffect(() => {
    if (user) {
      cleanBag();
      setUserID(user.sub.slice(6, user.sub.length));
      console.log(userID);
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

      dbUpdate(`/api/user/${userID}`, {
        purchases: updatedPurchase,
        mercadopago: updatedPreference,
        tempPurchase: [],
      });
    }
  }, [profile]);

  if (!updated) {
    return <div>Loading...</div>;
  }

  if (updated) {
    return (
      <>
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
      </>
    );
  }
}
