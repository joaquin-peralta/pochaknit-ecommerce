import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Loader from 'react-loader-spinner';
import { FiCheckCircle } from 'react-icons/fi';
import Button from 'react-bootstrap/Button';

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
    return null;
  }
};

export default function VerifiedPage() {
  let timer;
  const router = useRouter();
  const { user } = useUser();
  const [isVerified, setIsVerified] = useState(false);
  const [count, setCount] = useState(20);

  useEffect(() => {
    if (user && router.query.success) {
      updateUser(user.sub)
        .then(() => setIsVerified(true))
        .catch((e) => console.error(e));
    }
  }, [user, router.query.success]);

  useEffect(() => {
    if (isVerified) {
      if (count > 0) {
        timer = setTimeout(() => setCount(count - 1), 1000);
      } else {
        router.push('/api/auth/logout');
      }
    }
    return () => clearTimeout(timer);
  }, [isVerified, count]);

  if (!isVerified) {
    return (
      <>
        <div className="loader-container">
          <div className="loader">
            <Loader type="TailSpin" color="#5cadef" height={100} width={100} />
          </div>
        </div>
      </>
    );
  }

  if (isVerified) {
    return (
      <>
        <Alert variant="success">
          <FiCheckCircle />
          <span className="ml-2 fw-bold">Tu email fue verificado.</span>
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
            <Button
              variant="link"
              className="p-0 fw-bold"
              onClick={() => router.push('/api/auth/logout')}
            >
              aquí
            </Button>{' '}
            o espera <span className="fw-bold">{count}</span> segundos.
          </p>
        </Container>
      </>
    );
  }
}
