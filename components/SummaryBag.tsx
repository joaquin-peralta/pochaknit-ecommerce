import { useContext, useState, useEffect } from 'react';
import BagContext from '@context/BagContext';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineClose, AiOutlineShopping } from 'react-icons/ai';
import { Pattern } from '@types';
import { colors } from '@utils/themes';

type Props = {
  items: Pattern[];
};

const SummaryBag = ({ items }: Props) => {
  const { removeFromBag } = useContext(BagContext);
  const [total, setTotal] = useState(0);

  const handleRemoveFromBag = (product: Pattern) => {
    removeFromBag(product);
    window.localStorage.removeItem(String(product.id));
  };

  useEffect(() => {
    if (items !== null) {
      let sum = 0;
      for (const item of items) {
        sum += item.price;
      }
      setTotal(sum);
    }
  }, [items]);

  return (
    <Container fluid>
      <Row className="align-items-end py-2">
        <Col xs="auto">
          <AiOutlineShopping style={{ fontSize: '24px' }} />
        </Col>
        <Col xs="auto">
          <p className="h5 mb-0">Resumen de tu compra</p>
        </Col>
      </Row>
      <hr className="mt-0" />
      <ul className="list-unstyled pl-0 py-1 mb-0">
        {items.map((item) => (
          <li key={item.id} className="py-1">
            <Row className="align-items-center">
              <Col xs={3}>
                <Image
                  src={item.images[0].url}
                  alt={item.images[0].alternativeText}
                  width={900}
                  height={1124}
                  layout="responsive"
                />
              </Col>
              <Col xs={4}>
                {item.category} {item.name}
              </Col>
              <Col xs={3}>$ {item.price}</Col>
              <Col xs={2}>
                <button
                  type="button"
                  className="btn-cancel-item"
                  onClick={() => handleRemoveFromBag(item)}
                >
                  <AiOutlineClose style={{ color: `${colors.darkgray}` }} />
                </button>
              </Col>
            </Row>
          </li>
        ))}
      </ul>
      <hr />
      <Row className="align-items-center justify-content-between">
        <Col>
          <p className="mb-0">Total</p>
        </Col>
        <Col className="text-right">
          <p className="h4 font-weight-bold mb-0">$ {total}</p>
        </Col>
      </Row>

      <style jsx>{`
        .btn-cancel-item {
          border: 0;
          background: transparent;
        }
      `}</style>
    </Container>
  );
};

export default SummaryBag;
