import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { IoMdDownload } from 'react-icons/io';
import { Purchase, Pattern } from '@types';

type Props = {
  purchases: Purchase[];
};

const ProfilePatternItem = ({ purchases }: Props) => {
  const [products, setProducts] = useState<Pattern[]>([]);

  useEffect(() => {
    const purchasesId = purchases.map((purchase) => purchase.id);
    const fetchData = async () => {
      const res = await fetch('http://localhost:1337/patterns');
      const data: Pattern[] = await res.json();
      for (const pattern of data) {
        if (purchasesId.includes(String(pattern.id))) {
          setProducts([...products, pattern]);
        }
      }
    };
    fetchData();
  }, []);

  if (products.length === 0) {
    return <div>No hay patrones...</div>;
  }
  return (
    <Container>
      {products.map((product) => (
        <Row
          key={product.id}
          className="justify-content-around align-items-center"
        >
          <Col xs={3}>
            <Image
              src={product.images[0].url}
              alt={product.images[0].alternativeText}
              width={48}
              height={48}
              layout="intrinsic"
            />
          </Col>
          <Col xs={7}>
            <h6 className="mb-0">
              {product.category} {product.name}
            </h6>
          </Col>
          <Col xs={2}>
            <a href={product.files[0].url}>
              <IoMdDownload style={{ fontSize: '24px' }} />
            </a>
          </Col>
        </Row>
      ))}
      <hr className="mt-2" />
    </Container>
  );
};

export default ProfilePatternItem;
