import { useContext } from 'react';
import BagContext from '@context/BagContext';
import Paper from '@material-ui/core/Paper';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { Pattern } from '@types';
import { currentPrice } from '@utils/maths';
import { getStrapiMedia } from '@utils/strapi';

type Props = {
  items: Pattern[];
};

const SummaryBag = ({ items }: Props) => {
  const { removeFromBag, totalPrice } = useContext(BagContext);

  const handleRemoveFromBag = (product: Pattern) => {
    removeFromBag(product);
    window.localStorage.removeItem(String(product._id));
  };

  return (
    <Paper elevation={3}>
      <ListGroup variant="flush">
        {items.map((item) => (
          <ListGroup.Item key={item._id} className="mb-3">
            <Container fluid className="px-0">
              <Row className="align-items-center">
                <Col xs={4}>
                  <Image
                    src={getStrapiMedia(item.images[0])}
                    alt={item.images[0].alternativeText}
                    width={128}
                    height={176}
                  />
                </Col>
                <Col xs={4}>
                  <p className="text-capitalize mb-0">{item.category}</p>{' '}
                  <p className="text-uppercase mb-0">{item.name}</p>
                  <p className="mb-0">$ {currentPrice(item.price, item.discount)}</p>
                </Col>
                <Col xs={4} className="text-end">
                  <Button onClick={() => handleRemoveFromBag(item)}>
                    <CloseIcon />
                  </Button>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        ))}
        <ListGroup.Item className="text-end">
          <span className="fs-3 fw-bold me-4">Total:</span>
          <span className="fs-3 fw-bold text-end">$ {totalPrice}</span>
        </ListGroup.Item>
      </ListGroup>
    </Paper>
  );
};

export default SummaryBag;
