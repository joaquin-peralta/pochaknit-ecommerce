import { useContext, useState, SyntheticEvent } from 'react';
import Head from 'next/head';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { CartContext } from '@context/CartContext';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Loader from '@components/Loader';
import SummaryCart from '@components/SummaryCart';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Modal from 'react-bootstrap/Modal';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import { Pattern } from '@types';

const createPreference = async (items: Pattern[]) => {
  try {
    const res = await fetch('/api/mercadopago/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart: items }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const sendEmail = async (userId: string) => {
  try {
    const res = await fetch('/api/verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

function CheckoutPage() {
  const { cart } = useContext(CartContext);
  const { user, isLoading, error } = useUser();
  const [backdropState, setBackdropState] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [paypalAlert, setPaypalAlert] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleMercadopagoPurchase = async () => {
    setBackdropState(true);
    try {
      const res = await createPreference(cart);
      if (res && res.success) {
        if (process.env.NODE_ENV !== 'production') {
          return window.location.assign(res.data.sandbox_init_point);
        }
        return window.location.assign(res.data.init_point);
      }
      setBackdropState(false);
      setAlertState(true);
      return null;
    } catch (err) {
      setBackdropState(false);
      setAlertState(true);
      return null;
    }
  };

  const handleCloseAlert = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertState(false);
    setEmailSuccess(false);
    setEmailError(false);
  };

  const handleEmailVerification = async () => {
    setEmailSent(true);
    try {
      const response = await sendEmail(user.sub);
      setEmailSent(false);
      if (!response.success) {
        return setEmailError(true);
      }
      return setEmailSuccess(true);
    } catch (e) {
      setEmailSent(false);
      setEmailError(true);
      return null;
    }
  };

  if (error) return <div>Error</div>;

  if (isLoading) return <div>Loading...</div>;

  if (user) {
    return (
      <>
        <Head>
          <title>Checkout - Pocha Knit</title>
        </Head>
        {!user.email_verified && (
          <Alert variant="warning">
            <WarningIcon />
            <span className="fw-bold fs-6">
              Tu cuenta aún no ha sido verificada. Por favor revisa el email que te hemos enviado y
              verificala para poder continuar con tu compra.
            </span>{' '}
            <span className="fw-bold fs-6">
              Para reenviar nuevamente un email de verificación haz click{' '}
              <Button variant="link" className="p-0 fw-bold" onClick={handleEmailVerification}>
                aquí.
              </Button>
            </span>
          </Alert>
        )}
        <Loader open={emailSent}>
          <span className="fw-bold">Enviando email de verificación.</span>
          <span className="fw-bold">Por favor espere...</span>
        </Loader>

        {cart.length === 0 && (
          <Alert variant="info">
            <InfoIcon /> <span>Bolsa de compra vacía. Ver más</span>{' '}
            <Link href="/patterns">
              <a className="fw-bold">patrones.</a>
            </Link>
          </Alert>
        )}

        {cart.length > 0 && (
          <Container className="mt-3">
            <span className="fs-4 fw-bold">Resumen de tu compra</span>
            <Row>
              <Col>
                <SummaryCart items={cart} />
              </Col>
            </Row>
            <Row xs={1} md={2} className="py-4 text-center">
              <Col className="py-2">
                <Button
                  variant="primary"
                  onClick={handleMercadopagoPurchase}
                  disabled={!user.email_verified}
                >
                  <span className="fw-bold">Comprar desde Argentina</span>
                </Button>
              </Col>
              <Col className="py-2">
                <Button
                  variant="secondary"
                  onClick={() => setPaypalAlert(true)}
                  disabled={!user.email_verified}
                >
                  <span className="fw-bold">Comprar desde el Exterior</span>
                </Button>
              </Col>
            </Row>
          </Container>
        )}
        <Loader open={backdropState}>
          <span className="fw-bold">Redireccionando a Mercadopago.</span>
          <span className="fw-bold">Por favor espere...</span>
        </Loader>
        <Snackbar open={alertState} autoHideDuration={6000} onClose={handleCloseAlert}>
          <MuiAlert onClose={handleCloseAlert} severity="error">
            No pudimos procesar tu compra. Intenta de nuevo por favor.
          </MuiAlert>
        </Snackbar>
        <Snackbar open={emailError} autoHideDuration={6000} onClose={handleCloseAlert}>
          <MuiAlert onClose={handleCloseAlert} severity="error">
            No pudimos enviar el email. Por favor intenta de nuevo más tarde.
          </MuiAlert>
        </Snackbar>
        <Snackbar open={emailSuccess} autoHideDuration={6000} onClose={handleCloseAlert}>
          <MuiAlert onClose={handleCloseAlert} severity="success">
            Email enviado.
          </MuiAlert>
        </Snackbar>
        <Modal show={paypalAlert} onHide={() => setPaypalAlert(false)}>
          <Modal.Header>
            <Modal.Title>
              <InfoIcon />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Dentro de poco implementaremos PayPal en nuestro sitio web. Mientras tanto si quieres
            alguno de nuestros patrones envianos un mail a{' '}
            <span className="fw-bold">pochaknit@gmail.com</span>!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setPaypalAlert(false)}>
              <span className="fw-bold">OK!</span>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withPageAuthRequired(CheckoutPage);
