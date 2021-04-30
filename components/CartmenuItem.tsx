import { useContext } from 'react';
import BagContext from '@context/BagContext';
import useLocalStorage from '@hooks/useLocalStorage';
import { Pattern } from '@types';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineClose } from 'react-icons/ai';

import { colors } from '@utils/themes';

type Props = {
  item: Pattern;
};

const CartmenuItem = ({ item }: Props) => {
  const { removeFromBag } = useContext(BagContext);
  const { removeValue } = useLocalStorage(item.id, false);

  const handleRemoveFromBag = () => {
    removeFromBag(item);
    removeValue();
  };

  return (
    <Container>
      <Row className="justify-content-end">
        <Col xs={4}>
          <button type="button" className="btn-cancel-item" onClick={handleRemoveFromBag}>
            <AiOutlineClose style={{ color: `${colors.darkgray}` }} />
          </button>
        </Col>
      </Row>
      <Row className="py-1 justify-content-center">
        <Col xs={6}>
          <Image src={item.images[0].url} width={900} height={1124} layout="responsive" />
        </Col>
      </Row>
      <Row className="py-2 justify-content-center">
        <Col xs={6}>
          <p className="mb-0" style={{ color: `${colors.darkgray}` }}>
            {item.category} <span className="text-uppercase">{item.name}</span>
          </p>
          <small className="font-weight-bold" style={{ color: `${colors.darkgray}` }}>
            $ {item.price}
          </small>
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
