import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { IoIosArrowDown } from 'react-icons/io';
import ProfileVideoInnerItem from '@components/ProfileVideoInnerItem';
import { Purchase } from '@types';

type Props = {
  purchases: Purchase[];
};

const ProfileVideoItem = ({ purchases }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Container>
      {purchases.map((purchase) => (
        <div key={purchase.id}>
          <Row className="justify-content-around align-items-center">
            <Col xs={3}>
              <Image
                src={`${process.env.HOST}${purchase.pattern.images[0].url}`}
                width={48}
                height={48}
                layout="intrinsic"
              />
            </Col>
            <Col xs={7}>
              <h6 className="mb-0">
                {purchase.pattern.category} {purchase.pattern.name}
              </h6>
            </Col>
            <Col xs={2}>
              <button className="arrow-btn" type="button" onClick={handleClick}>
                <IoIosArrowDown style={{ fontSize: '24px' }} />
              </button>
            </Col>
          </Row>
          <ProfileVideoInnerItem
            visibility={isVisible}
            videos={purchase.videos}
          />
        </div>
      ))}
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
