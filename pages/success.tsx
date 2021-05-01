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
  const { data: profile } = useSWR<Profile>(
    user ? `/api/user/${user.sub.slice(6, user.sub.length)}` : null,
    fetcher,
  );
  const [updated, setUpdated] = useState(null);

  useEffect(() => {
    if (profile && bag) {
      console.log(bag);

      const newPurchase = profile.purchases.map((item) => item);
      const newPreference = profile.mercadopago.map((item) => item);

      for (const item of bag) {
        newPurchase.unshift(item.id);
      }
      // @ts-ignore
      newPreference.unshift(router.query.preference_id);

      const putData = async (purchases, mercadopago) => {
        try {
          const res = await fetch(`/api/user/${user.sub.slice(6, user.sub.length)}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ purchases, mercadopago }),
          });
          const data = await res.json();
          if (data.success) {
            setUpdated(true);
          } else {
            setUpdated(false);
          }
        } catch (error) {
          console.error(error);
        }
      };
      putData(newPurchase, newPreference);
    }
  }, [profile, bag]);

  if (isLoading) {
    return <div>Loading success page...</div>;
  }

  if (updated === null) {
    return (
      <>
        <h2>Actualizando tu perfil...</h2>
        <GlobalStyles />
      </>
    );
  }

  if (updated === false) {
    return (
      <>
        <h2>Ha ocurrido un error durante la actualización.</h2>
        <GlobalStyles />
      </>
    );
  }

  if (updated === true) {
    return (
      <>
        <h2>Perfil actualizado correctamente</h2>
        <GlobalStyles />
      </>
    );
  }
}
