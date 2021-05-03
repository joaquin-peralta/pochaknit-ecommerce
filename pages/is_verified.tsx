import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { putData } from '@utils/fetcher';
import Alert from 'react-bootstrap/Alert';
import GlobalStyles from '@styles/GlobalStyles';

export default function VerifiedPage() {
  const router = useRouter();
  const { user } = useUser();
  const [userID, setUserID] = useState('');
  const { data: isVerified } = useSWR(
    userID && router.query.success ? `/api/user/${userID}` : null,
    () => putData(`/api/user/${userID}`, { emailVerified: true }),
  );

  useEffect(() => {
    if (user) {
      setUserID(user.sub.slice(6, user.sub.length));
    }
  }, [user]);

  useEffect(() => {
    if (isVerified) {
      router.push('/api/auth/logout');
    }
  }, [isVerified]);

  if (!isVerified) {
    return <div>Loading...</div>;
  }

  if (isVerified) {
    return (
      <>
        <Alert variant="success">
          <span className="font-weight-bold">
            Tu email fue verificado. Si no eres redireccionado a Pocha Knit presiona{' '}
            <a href="/api/auth/logout">aquí.</a>
          </span>
        </Alert>
        <GlobalStyles />
      </>
    );
  }
}
