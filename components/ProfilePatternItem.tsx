import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import Alert from 'react-bootstrap/Alert';
import { IoMdDownload } from 'react-icons/io';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Pattern } from '@types';
import { colors } from '@utils/themes';
import { getStrapiMedia } from '@utils/strapi';

type Props = {
  purchases: Pattern[];
  // eslint-disable-next-line react/require-default-props
  pending: boolean;
};

export default function ProfilePatternItem({ purchases, pending = false }: Props) {
  if (purchases.length === 0) {
    return <p className="font-italic">Aun no has adquirido ningún patrón...</p>;
  }

  return (
    <Container>
      <ul className="list-unstyled">
        {purchases.map((purchase) => (
          <li key={purchase._id}>
            <Row className="py-3 justify-content-around align-items-center ">
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
                  <>
                    {purchase.files.urls.map((url) => (
                      <a key={url} href={url} target="_blank" rel="noreferrer">
                        <IoMdDownload style={{ fontSize: '28px', color: `${colors.darkgray}` }} />
                      </a>
                    ))}
                  </>
                )}
                {pending && (
                  <>
                    {purchase.files.urls.map((url) => (
                      <IoMdDownload
                        key={url}
                        style={{
                          fontSize: '28px',
                          color: `${colors.analogous500}`,
                          cursor: 'not-allowed',
                        }}
                      />
                    ))}
                  </>
                )}
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
      `}</style>
    </Container>
  );
}
