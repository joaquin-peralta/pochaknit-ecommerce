import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import ProfileVideoInnerItem from '@components/ProfileVideoInnerItem';
import { Pattern } from '@types';
import { colors } from '@utils/themes';

type Props = {
  purchases: Pattern[];
};

const ProfileVideoItem = ({ purchases }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Container>
      {purchases === null && <div>Cargando...</div>}

      {purchases.length === 0 && <div>No hay patrones</div>}

      {purchases.length > 0 && (
        <>
          {purchases.map((purchase) => (
            <div key={purchase.id}>
              <Row className="justify-content-around align-items-center">
                <Col xs={3}>
                  <Image
                    src={purchase.images[0].url}
                    alt={purchase.images[0].alternativeText}
                    width={48}
                    height={48}
                    layout="intrinsic"
                  />
                </Col>
                <Col xs={7}>
                  <h6 className="mb-0">
                    {purchase.category} {purchase.name}
                  </h6>
                </Col>
                <Col xs={2}>
                  <button className="arrow-btn" type="button" onClick={handleClick}>
                    <IconContext.Provider value={{ size: '24px', color: `${colors.darkgray}` }}>
                      {isVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </IconContext.Provider>
                  </button>
                </Col>
              </Row>
              <ProfileVideoInnerItem visibility={isVisible} videos={purchase.videos} />
            </div>
          ))}
          <hr className="mt-2" />

          <style jsx>{`
            .arrow-btn {
              border: 0;
              background: transparent;
            }
          `}</style>
        </>
      )}
    </Container>
  );
};

export default ProfileVideoItem;
