/* eslint-disable no-return-assign */
import { useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { IoIosArrowDown } from 'react-icons/io';
import ProfileVideoInnerItem from '@components/ProfileVideoInnerItem';
import { Pattern } from '@types';

type Props = {
  purchases: Pattern[];
};

const ProfileVideoItem = ({ purchases }: Props) => {
  const itemEls = useRef({});

  const handleClick = (index: number) => {
    if (itemEls.current[index].style.display === 'none') {
      itemEls.current[index].style.display = 'block';
    } else {
      itemEls.current[index].style.display = 'none';
    }
  };

  if (purchases.length === null) {
    return <div>Cargando...</div>;
  }

  if (purchases.length === 0) {
    return <div>No hay patrones</div>;
  }

  return (
    <Container>
      <ul className="list-unstyled">
        {purchases.map((purchase, index) => (
          <li key={purchase.id}>
            <Row className="py-3 justify-content-around align-items-center">
              <Col xs={3}>
                <div className="image-container">
                  <Image
                    src={purchase.images[0].url}
                    alt={purchase.images[0].alternativeText}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </Col>
              <Col xs={7}>
                <p className="mb-0 font-weight-bold">
                  {purchase.category} <span className="text-uppercase">{purchase.name}</span>
                </p>
              </Col>
              <Col xs={2}>
                <button className="arrow-btn" type="button" onClick={() => handleClick(index)}>
                  <IoIosArrowDown style={{ fontSize: '28px' }} />
                </button>
              </Col>
            </Row>
            <hr className="mt-2" />
            <div ref={(element) => (itemEls.current[index] = element)} style={{ display: 'none' }}>
              <ProfileVideoInnerItem videos={purchase.videos} />
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .image-container {
          width: 100%;
          height: 100px;
        }
        .arrow-btn {
          border: 0;
          background: transparent;
        }
      `}</style>
    </Container>
  );
};

export default ProfileVideoItem;
