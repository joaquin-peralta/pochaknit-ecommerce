/* eslint-disable no-return-assign */
import { useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import Alert from 'react-bootstrap/Alert';
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import ProfileVideoInnerItem from '@components/ProfileVideoInnerItem';
import { Pattern } from '@types';
import { getStrapiMedia } from '@utils/strapi';

type Props = {
  purchases: Pattern[];
  // eslint-disable-next-line react/require-default-props
  pending?: boolean;
};

const ProfileVideoItem = ({ purchases, pending = false }: Props) => {
  const itemEls = useRef({});

  const handleClick = (index: number) => {
    if (itemEls.current[index].style.display === 'none') {
      itemEls.current[index].style.display = 'block';
    } else {
      itemEls.current[index].style.display = 'none';
    }
  };

  if (purchases.length === 0) {
    return <p className="font-italic">No hay videos disponibles...</p>;
  }

  return (
    <Container>
      <ul className="list-unstyled">
        {purchases.map((purchase, index) => (
          <li key={purchase._id}>
            <Row className="py-3 justify-content-around align-items-center">
              <Col xs={3}>
                <div className={pending ? 'image-container-opacity' : 'image-container'}>
                  <Image
                    src={getStrapiMedia(purchase.images[0])}
                    alt={purchase.images[0].alternativeText}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </Col>
              <Col xs={7}>
                <p className={pending ? 'item-label-opacity' : 'item-label'}>
                  <span className="text-capitalize">{purchase.category}</span>{' '}
                  <span className="text-uppercase">{purchase.name}</span>
                  {pending && <span className="font-italic ml-2">(Pendiente)</span>}
                </p>
              </Col>
              <Col xs={2}>
                {!pending && (
                  <button className="arrow-btn" type="button" onClick={() => handleClick(index)}>
                    <IoIosArrowDown style={{ fontSize: '28px' }} />
                  </button>
                )}
                {pending && <IoIosArrowDown style={{ fontSize: '28px', cursor: 'not-allowed' }} />}
              </Col>
            </Row>
            {pending && (
              <Row>
                <Col>
                  <Alert variant="info">
                    <AiOutlineInfoCircle />
                    <small className="ml-2">
                      Mercadopago está procesando tu pago. ¡No te preocupes! Una vez aprobado se
                      habilitará el patrón.
                    </small>
                  </Alert>
                </Col>
              </Row>
            )}
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

        .image-container-opacity {
          width: 100%;
          height: 100px;
          opacity: 0.5;
        }

        .item-label {
          margin-bottom: 0;
          font-weight: 700;
        }

        .item-label-opacity {
          margin-bottom: 0;
          font-weight: 700;
          opacity: 0.5;
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
