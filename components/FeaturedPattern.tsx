import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import isOdd from 'is-odd';
import { Pattern } from '@types';
import { getStrapiMedia } from '@utils/strapi';

type Props = {
  pattern: Pattern;
  index: number;
};

const FeaturedPattern = ({ pattern, index }: Props) => (
  <Container fluid>
    <Row xs={1} md={2} className="align-items-center g-0">
      <Col md={{ order: isOdd(index + 1) ? 12 : 1 }}>
        <Image
          src={getStrapiMedia(pattern.images[0])}
          alt={pattern.images[0].alternativeText}
          width={900}
          height={1200}
          layout="responsive"
        />
      </Col>
      <Col className="text-center p-5" md={{ order: isOdd(index + 1) ? 1 : 12 }}>
        <span
          className="d-block fs-2 fw-bold text-uppercase fst-italic"
          style={{ color: `${pattern.primaryColor}` }}
        >
          New in
        </span>
        <span className="fs-1 fw-bold text-uppercase" style={{ color: `${pattern.primaryColor}` }}>
          {pattern.category}
        </span>{' '}
        <span className="fs-1 fw-bold text-uppercase" style={{ color: `${pattern.primaryColor}` }}>
          {pattern.name}
        </span>
      </Col>
    </Row>
  </Container>
);

export default FeaturedPattern;
