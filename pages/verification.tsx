import DefaultErrorPage from 'next/error';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { FiCheckCircle } from 'react-icons/fi';
import Button from 'react-bootstrap/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function VerifiedPage() {
  let timer;
  const router = useRouter();
  const { user, isLoading, error } = useUser();
  const [count, setCount] = useState(20);

  useEffect(() => {
    if (user && router.query.success === 'true') {
      if (count > 0) {
        timer = setTimeout(() => setCount(count - 1), 1000);
      } else {
        router.push('/api/auth/logout');
      }
    }
    return () => clearTimeout(timer);
  }, [user, router.query.success, count]);

  if (isLoading) {
    return (
      <div className="text-center p-5" style={{ color: '#5cadef' }}>
        <CircularProgress color="inherit" size={75} />
      </div>
    );
  }

  if (!user) {
    return <DefaultErrorPage statusCode={404} />;
  }

  if (error) {
    return (
      <Alert variant="danger">
        <span className="fw-bold">Se produjo un error al cargar tu perfil.</span>
      </Alert>
    );
  }

  if (user && router.query.success !== 'true') {
    return (
      <Alert variant="danger">
        <span className="fw-bold">
          Error inesperado. Lo sentimos no pudimos verificar tu email.
        </span>
      </Alert>
    );
  }

  if (user && router.query.success === 'true') {
    return (
      <>
        <Alert variant="success">
          <FiCheckCircle />
          <span className="ms-2 fw-bold">Tu email fue verificado.</span>
        </Alert>
        <Container fluid>
          <span className="d-block fs-2 fw-bold">Una cosa más...</span>
          <span className="d-block">
            Necesitamos que vuelvas a iniciar tu sesión para actualizarla. Asegurate de cerrar
            además todas las pestañas o ventanas de tu navegador en donde hayas abierto nuestro
            sitio web de pochaknit.com
          </span>
          <span className="d-block">
            Cierra sesión haciendo click{' '}
            <Button
              variant="link"
              className="p-0 fw-bold"
              onClick={() => router.push('/api/auth/logout')}
            >
              aquí
            </Button>{' '}
            o espera <span className="fw-bold">{count}</span> segundos.
          </span>
        </Container>
      </>
    );
  }
}
