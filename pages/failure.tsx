import { useEffect, useContext } from 'react';
import { CartContext } from '@context/CartContext';
import { useUser } from '@auth0/nextjs-auth0';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { FaTimesCircle } from 'react-icons/fa';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function SuccessPage() {
  const { user, isLoading } = useUser();

  const { cleanCart } = useContext(CartContext);

  useEffect(() => {
    if (user) {
      cleanCart();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="text-center p-5" style={{ color: '#5cadef' }}>
        <CircularProgress color="inherit" size={75} />
      </div>
    );
  }

  if (user) {
    return (
      <>
        <Alert variant="danger">
          <FaTimesCircle />
          <span className="ms-2 fw-bold">Pago cancelado.</span>
        </Alert>
        <Container fluid>
          <span className="d-block fs-2 fw-bold">Lo sentimos...</span>
          <span>No se ha podido efectuar tu compra.</span>
        </Container>
      </>
    );
  }
}
