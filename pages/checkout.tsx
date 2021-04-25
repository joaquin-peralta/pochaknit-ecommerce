import { useContext, useEffect } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import BagContext from '@context/BagContext';
import SummaryBag from '@components/SummaryBag';
import GlobalStyles from '@styles/GlobalStyles';
import { Pattern } from '@types';

export default withPageAuthRequired(function CheckoutPage() {
  const { bag } = useContext(BagContext);
  const { user } = useUser();
  const USER_ID = user.sub.slice(6, user.sub.length);

  const handleMercadoPago = async (items: Pattern[]) => {
    const preferenceContent = {
      additional_info: USER_ID,
      payer: {
        email: user.email,
      },
      items,
    };
    const createPreference = async () => {
      try {
        const response = await fetch('/api/mercadopago/create_preference', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(preferenceContent),
        });
        const preference = await response.json();
        window.localStorage.setItem(`_${USER_ID}`, JSON.stringify(await preference.data));
        window.location.href = await preference.data.init_point;
      } catch (err) {
        console.error(err);
      }
    };
    createPreference();
  };

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      for (const item of bag) {
        window.localStorage.removeItem(String(item.id));
      }
    };
  }, []);

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
                    <Button onClick={() => handleMercadoPago(bag)} variant="local" block>
                      Comprar desde Argentina
                    </Button>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col xs={9}>
                    <Button variant="ext" block>
                      Comprar desde el Exterior
                    </Button>
                  </Col>
                </Row>
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
