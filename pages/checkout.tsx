import { useContext, useState, useEffect } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import BagContext from '@context/BagContext';
import SummaryBag from '@components/SummaryBag';
import GlobalStyles from '@styles/GlobalStyles';
import { Pattern } from '@types';

export default withPageAuthRequired(function CheckoutPage() {
  const { bag } = useContext(BagContext);
  const { user } = useUser();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (user.email_verified) {
      setIsDisabled(false);
    }
    console.log(user.email_verified);
  }, [user.email_verified]);

  const handleMercadoPago = async (items: Pattern[]) => {
    setIsDisabled(true);
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
        window.location.href = await preference.data.init_point;
      } catch (error) {
        console.error(error);
      }
    };
    createPreference();
  };

  const handleVerification = () => {
    const sendEmail = async () => {
      try {
        const res = await fetch(`/api/email_verification/${user.sub}`, {
          method: 'POST',
        });
        const data = await res.json();
        console.log(data.success);
      } catch (error) {
        console.error(error);
      }
    };
    sendEmail();
  };

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
                    <Button
                      onClick={() => handleMercadoPago(bag)}
                      variant="local"
                      block
                      disabled={isDisabled}
                    >
                      Comprar desde Argentina
                    </Button>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col xs={9}>
                    <Button variant="ext" block disabled={isDisabled}>
                      Comprar desde el Exterior
                    </Button>
                  </Col>
                </Row>
                {!user.email_verified && (
                  <Row>
                    <Col>
                      <Alert variant="warning">
                        Por favor verifica tu email antes de realizar la compra.
                      </Alert>
                      <button type="button" onClick={handleVerification}>
                        Verificar email
                      </button>
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
