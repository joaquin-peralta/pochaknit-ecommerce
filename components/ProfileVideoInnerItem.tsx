import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import YouTube from 'react-youtube';
import GlobalStyles from '@styles/GlobalStyles';

type Props = {
  videosIds: string[];
};

const ProfileVideoInnerItem = ({ videosIds }: Props) => {
  if (videosIds.length === 0) {
    return <p className="font-italic">No hay videos disponibles.</p>;
  }

  return (
    <Container className="py-2">
      {videosIds.map((id) => (
        <Row key={id}>
          <Col>
            <YouTube videoId={id} containerClassName="youtubeContainer" />
          </Col>
        </Row>
      ))}
      <GlobalStyles />
    </Container>
  );
};

export default ProfileVideoInnerItem;
