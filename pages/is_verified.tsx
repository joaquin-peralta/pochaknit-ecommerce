import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Loader from 'react-loader-spinner';
import { FiCheckCircle } from 'react-icons/fi';
import Button from 'react-bootstrap/Button';
import { colors } from '@utils/themes';
import GlobalStyles from '@styles/GlobalStyles';

const updateUser = async (userId: string) => {
  try {
    const res = await fetch(`/api/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailVerified: true }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default function VerifiedPage() {
  const router = useRouter();
  const { user } = useUser();
  const [isVerified, setIsVerified] = useState(false);
  const [count, setCount] = useState(20);
  let timer;

  useEffect(() => {
    if (user && router.query.success) {
      updateUser(user.sub.slice(6, user.sub.length))
        .then(() => setIsVerified(true))
        .catch((e) => console.error(e));
    }
  }, [user, router.query.success]);

  const logout = () => {
    router.push('/api/auth/logout');
  };

  useEffect(() => {
    if (isVerified) {
      if (count > 0) {
        timer = setTimeout(() => setCount(count - 1), 1000);
      } else {
        logout();
      }
    }
    return () => clearTimeout(timer);
  }, [isVerified, count]);

  if (!isVerified) {
    return (
      <>
        <div className="loader-container">
          <div className="loader">
            <Loader type="TailSpin" color={colors.primaryStrong} height={100} width={100} />
          </div>
        </div>
        <GlobalStyles />
      </>
    );
  }

  if (isVerified) {
    return (
      <>
        <Alert variant="success">
          <FiCheckCircle />
          <span className="ml-2 font-weight-bold">Tu email fue verificado.</span>
        </Alert>
        <Container fluid>
          <h3>Una cosa más...</h3>
          <p>
            Necesitamos que vuelvas a iniciar tu sesión para actualizarla. Asegurate de cerrar
            además todas las pestañas o ventanas de tu navegador en donde hayas abierto nuestro
            sitio web de pochaknit.com!
          </p>
          <p>
            Cierra sesión haciendo click{' '}
            <Button variant="link" className="p-0 font-weight-bold" onClick={() => logout()}>
              aquí
            </Button>{' '}
            o espera <span className="font-weight-bold">{count}</span> segundos.
          </p>
        </Container>
        <GlobalStyles />

        <style jsx>{`
          .loader-container {
            display: relative;
            width: 100%;
            height: 100vh;
          }

          .loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        `}</style>
      </>
    );
  }
}
