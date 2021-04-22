import { useEffect } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import GlobalStyles from '@styles/GlobalStyles';

export default withPageAuthRequired(function SuccessPage() {
  const { user } = useUser();

  useEffect(() => {
    const USER_ID = user.sub.slice(6, user.sub.length);
    const preferenceId = window.localStorage.getItem(USER_ID);

    window.localStorage.clear();
  }, []);

  return (
    <>
      <h2>Compra exitosa...</h2>
      <GlobalStyles />
    </>
  );
});
