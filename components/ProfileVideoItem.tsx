import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { IoIosArrowDown } from 'react-icons/io';
import ProfileVideoInnerItem from '@components/ProfileVideoInnerItem';

const ProfileVideoItem = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
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
          <button className="arrow-btn" type="button" onClick={handleClick}>
            <IoIosArrowDown style={{ fontSize: '24px' }} />
          </button>
        </Col>
      </Row>
      <ProfileVideoInnerItem visibility={isVisible} />
      <hr className="mt-2" />

      <style jsx>{`
        .arrow-btn {
          border: 0;
          background: transparent;
        }
      `}</style>
    </Container>
  );
};

export default ProfileVideoItem;
