import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';

const FeaturedPattern = () => (
  <div className="py-5">
    <Container>
      <Row>
        <Col>
          <h4 className="text-center text-uppercase">
            <span className="font-italic">New</span> in
          </h4>
          <Image
            src="/medias-lola.jpeg"
            alt="medias"
            layout="intrinsic"
            width={900}
            height={1124}
          />
          <h2 className="text-center text-uppercase">
            Medias <span style={{ fontSize: '1.2em' }}>Lola</span>
          </h2>
        </Col>
      </Row>
    </Container>
  </div>
);

export default FeaturedPattern;
