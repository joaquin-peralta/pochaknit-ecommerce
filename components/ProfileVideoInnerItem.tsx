import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaFilm, FaPlay } from 'react-icons/fa';
import { CloudVideo } from '@types';

type Props = {
  videos: CloudVideo[];
};

const ProfileVideoInnerItem = ({ videos }: Props) => (
  <Container className="py-2">
    {videos.length === 0 && <div>No hay videos...</div>}
    {videos.length > 0 && (
      <>
        {videos.map((video, index) => (
          <Row key={video.id} className="justify-content-around align-items-center pt-2">
            <Col xs={3}>
              <FaFilm />
            </Col>
            <Col xs={7}>
              <small className="mb-0">Video {index + 1}</small>
            </Col>
            <Col xs={2}>
              <FaPlay />
            </Col>
          </Row>
        ))}
      </>
    )}
  </Container>
);

export default ProfileVideoInnerItem;
