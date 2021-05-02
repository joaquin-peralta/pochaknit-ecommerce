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
  const { user } = useUser();
  const { cleanBag } = useContext(BagContext);
  const { data: profile } = useSWR<Profile>(
    user ? `/api/user/${user.sub.slice(6, user.sub.length)}` : null,
    fetcher,
  );
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    cleanBag();
  }, []);

  useEffect(() => {
    if (profile && updating === null) {
      if (profile.tempPurchase.length > 0) {
        setUpdating(true);
      }
    }
  }, [profile]);

  useEffect(() => {
    if (updating) {
      const newPurchase = profile.purchases.map((item) => item);
      const newPreference = profile.mercadopago.map((item) => item);

      for (const id of profile.tempPurchase) {
        newPurchase.unshift(id);
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
            body: JSON.stringify({ purchases, mercadopago, tempPurchase: [] }),
          });
          const data = await res.json();
          if (data.success) {
            setUpdating(false);
          } else {
            setUpdating(null);
          }
        } catch (error) {
          console.error(error);
        }
      };
      putData(newPurchase, newPreference);
    }
  }, [updating]);

  if (updating === null) {
    return (
      <>
        <h2>Cargando página...</h2>
        <GlobalStyles />
      </>
    );
  }

  if (updating === true) {
    return (
      <>
        <h2>Actualizando tu perfil...</h2>
        <GlobalStyles />
      </>
    );
  }

  if (updating === false) {
    return (
      <>
        <h2>Perfil actualizado correctamente</h2>
        <GlobalStyles />
      </>
    );
  }
}
