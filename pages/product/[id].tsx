import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SlideShowGallery from '@components/SlideShowGallery';
import GlobalStyles from '@styles/GlobalStyles';

const ProductPage = () => (
  <Container>
    <Row>
      <Col>
        <SlideShowGallery />
      </Col>
      <Col>
        <h3>Chaleco Nina</h3>
      </Col>
    </Row>
    <GlobalStyles />
  </Container>
);

export default ProductPage;
