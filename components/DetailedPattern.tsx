import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuiltedImages from '@components/QuiltedImages';
import { Pattern } from '@types';

type Props = {
  pattern: Pattern;
};

const DetailedPattern = ({ pattern }: Props) => (
  <Container className="py-3">
    <Row className="align-items-center">
      <Col>
        <QuiltedImages images={pattern.images} />
      </Col>
    </Row>
    <Row>
      <Col className="text-center py-3">
        <h2>
          {pattern.category}{' '}
          <span className="text-uppercase">{pattern.name}</span>
        </h2>
        <p className="h3">$ {pattern.price}</p>
      </Col>
    </Row>
  </Container>
);

export default DetailedPattern;
