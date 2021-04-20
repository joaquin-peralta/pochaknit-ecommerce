import { useContext } from 'react';
import BagContext from '@context/BagContext';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineClose } from 'react-icons/ai';
import { Pattern } from '@types';
import { colors } from '@utils/themes';

type Props = {
  item: Pattern;
};

const CartmenuItem = ({ item }: Props) => {
  const { removeFromBag } = useContext(BagContext);

  const handleRemoveFromBag = (product: Pattern) => {
    removeFromBag(product);
    window.localStorage.removeItem(String(product.id));
  };

  return (
    <Container>
      <Row className="py-4 align-items-center">
        <Col xs={3}>
          <Image
            src={item.images[0].url}
            width={900}
            height={1124}
            layout="responsive"
          />
        </Col>
        <Col xs={6}>
          <p className="mb-0" style={{ color: `${colors.darkgray}` }}>
            {item.category} <span className="text-uppercase">{item.name}</span>
          </p>
          <small style={{ color: `${colors.darkgray}` }}>$ {item.price}</small>
        </Col>
        <Col xs={3} className="text-center">
          <button
            type="button"
            className="btn-cancel-item"
            onClick={() => handleRemoveFromBag(item)}
          >
            <AiOutlineClose style={{ color: `${colors.darkgray}` }} />
          </button>
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

export default CartmenuItem;
