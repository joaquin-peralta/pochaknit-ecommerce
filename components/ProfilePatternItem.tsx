import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { IoMdDownload } from 'react-icons/io';
import { Purchase } from '@types';

type Props = {
  purchases: Purchase[];
};

const ProfilePatternItem = ({ purchases }: Props) => (
  <Container>
    {purchases.map((purchase) => (
      <Row
        key={purchase.id}
        className="justify-content-around align-items-center"
      >
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
          <a href={purchase.pdf}>
            <IoMdDownload style={{ fontSize: '24px' }} />
          </a>
        </Col>
      </Row>
    ))}
    <hr className="mt-2" />
  </Container>
);

export default ProfilePatternItem;
