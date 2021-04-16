import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CartmenuItem = () => (
  <Container>
    <Row className="py-4 align-items-center">
      <Col xs={3}>
        <Image
          src="/chaleco-nina.jpeg"
          width={72}
          height={72}
          layout="responsive"
        />
      </Col>
      <Col xs={6}>
        <p className="mb-0">Chaleco NINA</p>
        <small>$ 1.490</small>
      </Col>
      <Col xs={3} className="text-center">
        <button type="button" className="btn-cancel-item">
          <AiOutlineClose />
        </button>
      </Col>
    </Row>

    <style jsx>{`
      .btn-cancel-item {
        border: 0;
        background: transparent;
      }
    `}</style>
  </Container>
);

export default CartmenuItem;
