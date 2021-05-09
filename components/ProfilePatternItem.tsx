import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { IoMdDownload } from 'react-icons/io';
import { Pattern } from '@types';
import { colors } from '@utils/themes';

type Props = {
  purchases: Pattern[];
};

export default function ProfilePatternItem({ purchases }: Props) {
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
                  <span className="text-capitalize">{purchase.category}</span>{' '}
                  <span className="text-uppercase">{purchase.name}</span>
                </p>
              </Col>
              <Col xs={2}>
                {purchase.files.urls.map((url) => (
                  <a key={url} href={url} target="_blank" rel="noreferrer">
                    <IoMdDownload style={{ fontSize: '28px', color: `${colors.darkgray}` }} />
                  </a>
                ))}
              </Col>
            </Row>
            <hr className="mt-2" />
          </li>
        ))}
      </ul>

      <style jsx>{`
        .image-container {
          width: 100%;
          height: 100px;
        }
      `}</style>
    </Container>
  );
}
