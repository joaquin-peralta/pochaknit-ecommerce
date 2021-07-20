import { InferGetStaticPropsType, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useContext } from 'react';
import BagContext from '@context/BagContext';
import { Pattern } from '@types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import ProductPrice from '@components/ProductPrice';
import Button from 'react-bootstrap/Button';
import { MdAdd } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import { getStrapiUrl, getStrapiMedia } from '@utils/strapi';
import useLocalStorage from '@hooks/useLocalStorage';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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

const SinglePatternPage = ({ pattern }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { bag, addToBag } = useContext(BagContext);
  const { setLocalStorage } = useLocalStorage(pattern._id, false);
  const matches = useMediaQuery('(min-width:768px)');

  const handleAddToBag = (product: Pattern) => {
    addToBag(product);
    setLocalStorage(product);
  };

  const handleDisable = (product: Pattern) => {
    if (bag.length > 0) {
      for (const element of bag) {
        if (element._id === product._id) {
          return true;
        }
      }
    }
    return false;
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
          <Col xs md={6}>
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
          <Col xs md={{ span: 5, offset: 1 }} className="py-5">
            <h2 className="mb-3">
              <span className="text-capitalize">{pattern.category}</span>{' '}
              <span className="text-uppercase">{pattern.name}</span>
            </h2>
            <p>Patrón de tejido</p>
            <ProductPrice price={pattern.price} discount={pattern.discount} />
            <div className="mt-3">
              <Button
                variant="primary"
                onClick={() => handleAddToBag(pattern)}
                disabled={handleDisable(pattern)}
                block
              >
                <MdAdd style={{ fontSize: '18px' }} />
                Añadir a la bolsa
              </Button>
            </div>
          </Col>
        </Row>
        <div className={matches ? 'py-5' : ''}>
          <ReactMarkdown>{pattern.description}</ReactMarkdown>
        </div>
      </Container>
    </>
  );
};

export default SinglePatternPage;
