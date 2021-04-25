import { useState, useEffect } from 'react';
import GlobalStyles from '@styles/GlobalStyles';

export default function SuccessPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const USER_ID = window.localStorage.getItem('usr');
    const preference = JSON.parse(window.localStorage.getItem(`_${USER_ID}`));
    const updateUserPurchase = async () => {
      try {
        await fetch(`/api/users/${USER_ID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(preference.items),
        });
      } catch (err) {
        console.error(err);
      }
    };
    updateUserPurchase();
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (!isLoading) {
    window.localStorage.clear();
    return (
      <>
        <h2>Compra exitosa...</h2>
        <GlobalStyles />
      </>
    );
  }
}
