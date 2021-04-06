import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaFilm, FaPlay } from 'react-icons/fa';

type Props = {
  visibility: boolean;
};

const ProfileVideoInnerItem = ({ visibility }: Props) => (
  <div className={visibility ? 'show' : 'hide'}>
    <Container className="py-2">
      <Row className="justify-content-around align-items-center pt-2">
        <Col xs={3}>
          <FaFilm />
        </Col>
        <Col xs={7}>
          <small className="mb-0">Video 01</small>
        </Col>
        <Col xs={2}>
          <FaPlay />
        </Col>
      </Row>
    </Container>

    <style jsx>{`
      .hide {
        display: none;
      }

      .show {
        display: block;
      }
    `}</style>
  </div>
);

export default ProfileVideoInnerItem;
