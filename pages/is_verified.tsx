import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { putData } from '@utils/fetcher';
import Alert from 'react-bootstrap/Alert';
import Loader from 'react-loader-spinner';
import { colors } from '@utils/themes';
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
    return (
      <div className="loader-container">
        <div className="loader">
          <Loader type="TailSpin" color={colors.primaryStrong} height={100} width={100} />
        </div>
      </div>
    );
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
