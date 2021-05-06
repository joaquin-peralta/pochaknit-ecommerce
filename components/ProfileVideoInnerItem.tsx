import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import YouTube from 'react-youtube';

type Props = {
  videosUrls: string[];
};

const ProfileVideoInnerItem = ({ videosUrls }: Props) => {
  if (videosUrls.length === 0) {
    return <p className="font-italic">No hay videos disponibles...</p>;
  }

  return (
    <Container className="py-2">
      {videosUrls.map((url) => (
        <Row key={url}>
          <Col className="text-center">
            <YouTube videoId="9BMwcO6_hyA" />
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ProfileVideoInnerItem;
