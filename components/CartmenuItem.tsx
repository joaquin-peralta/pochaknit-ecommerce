import { useContext } from 'react';
import { CartContext } from '@context/CartContext';
import { Pattern } from '@types';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { currentPrice } from '@utils/maths';
import { getStrapiMedia } from '@utils/strapi';

type Props = {
  item: Pattern;
};

const CartmenuItem = ({ item }: Props) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <Container>
      <Row className="justify-content-end">
        <Col xs={4}>
          <Button className="btn-cancel-item" onClick={() => removeFromCart(item)}>
            <CloseIcon fontSize="small" />
          </Button>
        </Col>
      </Row>
      <Row className="py-1 justify-content-center">
        <Col xs={6}>
          <Image
            src={getStrapiMedia(item.images[0])}
            alt={item.images[0].alternativeText}
            width={900}
            height={1200}
            layout="responsive"
          />
        </Col>
      </Row>
      <Row className="py-2 justify-content-center">
        <Col xs={6}>
          <p className="mb-0">
            <span className="text-capitalize">{item.category}</span>{' '}
            <span className="text-uppercase">{item.name}</span>
          </p>
          <small className="fw-bold">$ {currentPrice(item.price, item.discount)}</small>
        </Col>
      </Row>
    </Container>
  );
};

export default CartmenuItem;
