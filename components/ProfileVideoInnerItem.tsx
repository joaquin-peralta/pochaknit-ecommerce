import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import YouTube from 'react-youtube';
import styles from '@styles/pages/Videos.module.scss';

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
            <YouTube videoId={video.id} containerClassName={styles.youtubeContainer} />
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ProfileVideoInnerItem;
