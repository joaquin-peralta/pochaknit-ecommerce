import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import YouTube from 'react-youtube';
import GlobalStyles from '@styles/GlobalStyles';

type Props = {
  videos: any;
};

const ProfileVideoInnerItem = ({ videos }: Props) => {
  if (videos.length === 0) {
    return <p className="font-italic">No hay videos disponibles.</p>;
  }

  return (
    <Container className="py-2">
      {videos.map((video) => (
        <Row key={video.id}>
          <Col>
            <YouTube videoId={video.id} containerClassName="youtubeContainer" />
          </Col>
        </Row>
      ))}
      <GlobalStyles />
    </Container>
  );
};

export default ProfileVideoInnerItem;
