import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import BagContext from '@context/BagContext';
import SummaryBag from '@components/SummaryBag';
import GlobalStyles from '@styles/GlobalStyles';
import { Pattern } from '@types';

export default function CheckoutPage() {
  const { bag } = useContext(BagContext);

  /* const createMercadoPagoButton = (id) => {
    const script = document.createElement('script');
    script.src =
      'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
    script.type = 'text/javascript';
    script.dataset.preferenceId = id;
    document.querySelector('#mp-btn-checkout').appendChild(script);
  }; */

  const handleLocal = async (items: Pattern[]) => {
    const createPreference = async () => {
      try {
        const response = await fetch('/api/mercadopago/create_preference', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(items),
        });
        const data = await response.json();
        window.location.href = await data.init_point;
      } catch (err) {
        console.error(err);
      }
    };
    createPreference();
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
                      onClick={() => handleLocal(bag)}
                      variant="local"
                      block
                    >
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
}
