import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { IoIosArrowDown } from 'react-icons/io';
import ProfileVideoInnerItem from '@components/ProfileVideoInnerItem';
import { Purchase, Pattern } from '@types';

type Props = {
  purchases: Purchase[];
};

const ProfileVideoItem = ({ purchases }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<Pattern[]>([]);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

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
    return <div>No hay videos...</div>;
  }

  return (
    <Container>
      {products.map((product) => (
        <div key={product.id}>
          <Row className="justify-content-around align-items-center">
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
              <button className="arrow-btn" type="button" onClick={handleClick}>
                <IoIosArrowDown style={{ fontSize: '24px' }} />
              </button>
            </Col>
          </Row>
          <ProfileVideoInnerItem
            visibility={isVisible}
            videos={product.videos}
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
