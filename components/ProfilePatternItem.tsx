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

const ProfilePatternItem = ({ purchases }: Props) => (
  <Container>
    {purchases === null && <div>Cargando...</div>}

    {purchases.length === 0 && <div>No hay patrones</div>}

    {purchases.length > 0 && (
      <>
        {purchases.map((purchase) => (
          <Row key={purchase.id} className="justify-content-around align-items-center ">
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
              <a
                href="https://drive.google.com/file/d/1-cOd1As5RsVTekzvu8Py8-S8M1k1eKLD/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
              >
                <IoMdDownload style={{ fontSize: '24px', color: `${colors.darkgray}` }} />
              </a>
            </Col>
          </Row>
        ))}
        <hr className="mt-2" />
      </>
    )}
  </Container>
);

export default ProfilePatternItem;
