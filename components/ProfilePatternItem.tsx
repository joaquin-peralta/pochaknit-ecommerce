import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { IoMdDownload } from 'react-icons/io';

const ProfilePatternItem = () => (
  <Container>
    <Row className="justify-content-around align-items-center">
      <Col xs={3}>
        <Image
          src="/chaleco-nina.jpeg"
          width={48}
          height={48}
          layout="intrinsic"
        />
      </Col>
      <Col xs={7}>
        <h6 className="mb-0">Chaleco Nina</h6>
      </Col>
      <Col xs={2}>
        <IoMdDownload style={{ fontSize: '24px' }} />
      </Col>
    </Row>
    <hr className="mt-2" />
  </Container>
);

export default ProfilePatternItem;
