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
      <>
        <div className="loader-container">
          <Loader type="TailSpin" color={colors.primaryStrong} height={100} width={100} />
        </div>
        <GlobalStyles />
      </>
    );
  }

  if (isVerified) {
    return (
      <>
        <Alert variant="success">
          <span className="font-weight-bold">
            Tu email fue verificado. Vuelve a iniciar sesión por favor.
          </span>
        </Alert>
        <GlobalStyles />

        <style jsx>{`
          .loader-container {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem;
          }
        `}</style>
      </>
    );
  }
}
