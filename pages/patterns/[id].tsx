import { GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useContext } from 'react';
import { CartContext } from '@context/CartContext';
import { Pattern } from '@types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import ProductPrice from '@components/ProductPrice';
import Button from 'react-bootstrap/Button';
import AddIcon from '@material-ui/icons/Add';
import ReactMarkdown from 'react-markdown';
import { getStrapiUrl, getStrapiMedia } from '@utils/strapi';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as fbq from '@utils/fpixel';

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(getStrapiUrl('/patterns'));
  const patterns: Pattern[] = await response.json();

  return {
    paths: patterns.map((pattern) => ({
      params: { id: pattern._id },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const response = await fetch(getStrapiUrl(`/patterns/?id=${id}`));
  const found: Pattern[] = await response.json();

  return {
    props: {
      pattern: found[0],
    },
  };
};

type Props = {
  pattern: Pattern;
};

function SinglePatternPage({ pattern }: Props) {
  const { addToCart } = useContext(CartContext);
  const matches = useMediaQuery('(min-width:768px)');

  const handleAddToCart = () => {
    addToCart(pattern);
    if (process.env.NODE_ENV === 'production') {
      fbq.event('AddToCart', { content_name: `${pattern.category} ${pattern.name}` });
    }
  };

  return (
    <>
      <Head>
        <title>
          {pattern.category} {pattern.name} - Pocha Knit
        </title>
      </Head>
      <Container>
        <Row xs={1} md={2} className="justify-content-between">
          <Col md={6}>
            <Carousel nextLabel="" prevLabel="">
              {pattern.images.map((image) => (
                <Carousel.Item key={image._id}>
                  <div className="d-block w-100">
                    <Image
                      src={getStrapiMedia(image)}
                      alt={image.alternativeText}
                      width={900}
                      height={1200}
                      layout="responsive"
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col className={matches ? 'p-5' : 'py-3'}>
            <span className="fs-1 fw-bold text-capitalize">{pattern.category}</span>{' '}
            <span className="fs-1 fw-bold text-uppercase">{pattern.name}</span>
            <span className="d-block mb-3">Patrón de tejido</span>
            <ProductPrice price={pattern.price} discount={pattern.discount} />
            <Button variant="primary" onClick={handleAddToCart} className="my-3" block>
              <AddIcon fontSize="small" />
              <span className="fw-bold">Añadir a la bolsa</span>
            </Button>
          </Col>
        </Row>
        <div className={matches ? 'py-5' : ''}>
          <ReactMarkdown>{pattern.description}</ReactMarkdown>
        </div>
      </Container>
    </>
  );
}

export default SinglePatternPage;
