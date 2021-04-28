import { useState, useEffect, useContext } from 'react';
import BagContext from '@context/BagContext';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Profile } from '@types';
import GlobalStyles from '@styles/GlobalStyles';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SuccessPage() {
  const router = useRouter();
  const { bag, cleanBag } = useContext(BagContext);
  const { user, isLoading } = useUser();
  const [userID, setUserID] = useState('');
  const { data: profile } = useSWR<Profile>(userID ? `/api/user/${userID}` : null, fetcher);
  const [isUpdating, setIsUpdating] = useState(true);

  useEffect(() => {
    if (user) {
      setUserID(user.sub.slice(6, user.sub.length));
      console.log(bag);
      console.log(userID);
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      const updateDB = async () => {
        await fetch(`/api/user/${userID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ purchases: bag, mercadopago: router.query.preference_id }),
        })
          .then(() => setIsUpdating(false))
          .catch((err) => console.error(err))
          .then(() => cleanBag());
      };
      updateDB();
    }
  }, [profile]);

  if (isLoading) {
    return <div>Loading success page...</div>;
  }

  if (isUpdating) {
    return (
      <>
        <h2>Actualizando tu perfil...</h2>
        <GlobalStyles />
      </>
    );
  }

  if (!isUpdating) {
    return (
      <>
        <h2>Compra exitosa...</h2>
        <GlobalStyles />
      </>
    );
  }
}
