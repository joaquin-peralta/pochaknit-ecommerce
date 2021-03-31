import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuiltedImages from '@components/QuiltedImages/QuiltedImages';

const PatternsList = () => (
  <Container fluid="md">
    <Row xs={1} lg={2} className="align-items-center">
      <Col lg={8}>
        <QuiltedImages />
      </Col>
      <Col lg={4} className="text-center">
        <h2>Medias Lola</h2>
        <p className="h5">$ 900</p>
      </Col>
    </Row>
  </Container>
);

export default PatternsList;
