import { useContext, useState, useEffect } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import BagContext from '@context/BagContext';
import SummaryBag from '@components/SummaryBag';
import { FiAlertTriangle } from 'react-icons/fi';
import GlobalStyles from '@styles/GlobalStyles';
import { Pattern } from '@types';

const savePurchase = async (url: string, purchaseID: string[]) => {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tempPurchase: purchaseID }),
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }

  return res.json();
};

const createPreference = async (items: Pattern[]) => {
  const res = await fetch('/api/mercadopago/create_preference', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(items),
  });
  if (!res.ok) {
    const error = new Error('No se ha podido procesar tu compra. Por favor intente nuevamente.');
    throw error;
  }

  return res.json();
};

export default withPageAuthRequired(function CheckoutPage() {
  const router = useRouter();
  const { bag } = useContext(BagContext);
  const { user } = useUser();
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(null);
  const { data } = useSWR(
    paymentStatus ? `/api/user/${user.sub.slice(6, user.sub.length)}` : null,
    () =>
      savePurchase(`/api/user/${user.sub.slice(6, user.sub.length)}`, ['607769291f06a51e69ea2f9f']),
  );
  const { data: preference } = useSWR(data ? '/api/mercadopago/create_preference' : null, () =>
    createPreference(bag),
  );

  useEffect(() => {
    if (preference) {
      if (preference.success) {
        router.push(preference.data.init_point);
      }
    }
  }, [preference]);

  /* useEffect(() => {
    if (user.email_verified) {
      setPaymentStatus(false);
    }
  }, [user.email_verified]); */

  /* const handleMercadoPagoPurchase = (items: Pattern[]) => {
    setPaymentStatus(true);
    const createPreference = async () => {
      try {
        const response = await fetch('/api/mercadopago/create_preference', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(items),
        });
        const preference = await response.json();
        router.push(await preference.data.init_point);
      } catch (error) {
        console.error(error);
      }
    };
    createPreference();
  }; */

  /* const handleVerification = async () => {
    setSendingEmail(true);
    const sendEmail = async () => {
      try {
        const res = await fetch(`/api/email_verification/${user.sub}`, {
          method: 'POST',
        });
        const data = await res.json();
        return data;
      } catch (error) {
        console.error(error);
        return false;
      }
    };
    const data = await sendEmail();
    if (data.success) {
      setSendingEmail(false);
    }
  }; */

  return (
    <div className="page">
      {bag.length === 0 && <div>Bolsa de compra vacía...</div>}
      {bag.length > 0 && (
        <Container fluid>
          <Row xs={1} lg={2} className="align-items-center">
            <Col>
              <SummaryBag items={bag} />
            </Col>
            <Col>
              <Container className="py-4">
                <Row className="justify-content-center mb-4">
                  <Col xs={9}>
                    <Button onClick={() => setPaymentStatus(true)} variant="primary" block>
                      Comprar desde Argentina
                    </Button>
                  </Col>
                </Row>
                <Row className="justify-content-center mb-4">
                  <Col xs={9}>
                    <Button variant="secondary" block disabled={paymentStatus}>
                      Comprar desde el Exterior
                    </Button>
                  </Col>
                </Row>
                {!user.email_verified && (
                  <Row>
                    <Col>
                      <Alert variant="warning">
                        <FiAlertTriangle />
                        <small className="ml-2 font-weight-bold">
                          Por favor verifica tu cuenta para poder realizar la compra. Si aun no has
                          reicibido un mail de verificación, revisa tu correo spam o presiona{' '}
                          <Button className="p-0" variant="link">
                            <strong>aquí</strong>
                          </Button>{' '}
                          para reenviarlo.
                        </small>
                      </Alert>
                      {sendingEmail === true && <small>Enviando mail de verificación...</small>}
                      {sendingEmail === false && <small>Mail de verificación enviado.</small>}
                    </Col>
                  </Row>
                )}
              </Container>
            </Col>
          </Row>
        </Container>
      )}
      <GlobalStyles />

      <style jsx>{`
        .page {
          height: calc(100vh - 72px);
        }
      `}</style>
    </div>
  );
});
