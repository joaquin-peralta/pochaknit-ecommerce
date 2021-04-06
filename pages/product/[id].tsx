import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MobileCarousel from '@components/MobileCarousel';
import SlideShowGallery from '@components/SlideShowGallery';
import Button from '@components/Button';
import GlobalStyles from '@styles/GlobalStyles';

const ProductPage = () => (
  <Container>
    <Row xs={1} md={2}>
      <Col>
        <div className="mobile-breakpoint">
          <MobileCarousel />
        </div>
        <div className="tablet-breakpoint">
          <SlideShowGallery />
        </div>
      </Col>
      <Col>
        <h3>Chaleco Nina</h3>
        <p>$ 1.499</p>
        <Button variant="secondary" content="Realizar compra" />
      </Col>
    </Row>
    <GlobalStyles />

    <style jsx>{`
      .tablet-breakpoint {
        display: none;
      }
      @media screen and (max-width: 767px) {
        .mobile-breakpoint {
          display: block;
        }
      }

      @media screen and (min-width: 768px) {
        .mobile-breakpoint {
          display: none;
        }

        .tablet-breakpoint {
          display: block;
        }
      }
    `}</style>
  </Container>
);

export default ProductPage;
