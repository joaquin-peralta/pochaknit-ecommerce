import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import Alert from 'react-bootstrap/Alert';
import GlobalStyles from '@styles/GlobalStyles';

export default function VerifiedPage() {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const updateDB = async () => {
    try {
      const res = await fetch(`/api/user/${user.sub}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailVerified: true }),
      });
      const data = await res.json();
      console.log(data);
      router.push('/api/auth/logout');
      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    if (router.query === null || router.query === undefined) {
      return;
    }
    setLoading(false);
    if (user && router.query.code === 'success' && router.query.success) {
      setIsVerified(true);
      updateDB();
    }
  }, [router.query, user]);

  if (loading) {
    return (
      <>
        <p>Espere por favor...</p>
      </>
    );
  }

  return (
    <>
      {isVerified && (
        <Alert variant="success">
          <span className="font-weight-bold">
            Tu email fue verificado. Si no eres redireccionado a Pocha Knit presiona{' '}
            <a href="/api/auth/logout">aquí.</a>
          </span>
        </Alert>
      )}
      <GlobalStyles />
    </>
  );
}
