import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import styles from '@styles/components/Avatar.module.scss';

export interface AvatarProps {
  picture: string;
  nickname: string;
  email: string;
}

const Avatar = ({ picture, nickname, email }: AvatarProps) => (
  <Container>
    <Row xs={1} className="text-center py-4 mb-4">
      <Col>
        <Image
          className={styles.avatar}
          src={picture}
          alt={nickname}
          width={72}
          height={72}
          layout="intrinsic"
        />
      </Col>
      <Col>
        <p className="font-weight-bold mb-0">{nickname}</p>
      </Col>
      <Col>
        <small style={{ color: '#9CA1A5' }}>{email}</small>
      </Col>
    </Row>
  </Container>
);

export default Avatar;
