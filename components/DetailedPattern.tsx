import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuiltedImages from '@components/QuiltedImages';
import { Pattern } from '@types';

type Props = {
  pattern: Pattern;
};

const DetailedPattern = ({ pattern }: Props) => (
  <Container fluid="md">
    <Row xs={1} lg={2} className="align-items-center">
      <Col lg={8}>
        <QuiltedImages images={pattern.images} />
      </Col>
      <Col lg={4} className="text-center">
        <h2>
          {pattern.category} {pattern.name}
        </h2>
        <p className="h5">$ {pattern.price}</p>
      </Col>
    </Row>
  </Container>
);

export default DetailedPattern;
