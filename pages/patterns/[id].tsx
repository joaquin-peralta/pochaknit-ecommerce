import { InferGetStaticPropsType, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useContext } from 'react';
import BagContext from '@context/BagContext';
import { Pattern } from '@types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MobileAndTabletGallery from '@components/MobileCarousel';
import DesktopGallery from '@components/SlideShowGallery';
import ProductPrice from '@components/ProductPrice';
import Button from 'react-bootstrap/Button';
import { MdAdd } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import GlobalStyles from '@styles/GlobalStyles';
import useLocalStorage from '@hooks/useLocalStorage';

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.HOST}/patterns/`);
  const patterns: Pattern[] = await response.json();

  return {
    paths: patterns.map((pattern) => ({
      params: { id: pattern._id },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const response = await fetch(`${process.env.HOST}/patterns/?id=${id}`);
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
        <Row xs={1} md={2} className="py-4 justify-content-between">
          <Col xs md={6}>
            <div className="tablet-breakpoint">
              <MobileAndTabletGallery images={pattern.images} />
            </div>
            <div className="desktop-breakpoint">
              <DesktopGallery images={pattern.images} />
            </div>
          </Col>
          <Col xs md={{ span: 5, offset: 1 }} className="pt-5 pb-2">
            <h2 className="mb-3">
              <span className="text-capitalize">{pattern.category}</span>{' '}
              <span className="text-uppercase">{pattern.name}</span>
            </h2>
            <ProductPrice price={pattern.price} discount={pattern.discount} />

            <div className="btn-container">
              <Button
                variant="primary"
                onClick={() => handleAddToBag(pattern)}
                disabled={handleDisable(pattern)}
                block
              >
                <MdAdd style={{ fontSize: '18px' }} />
                <span className="ml-2">Añadir a la bolsa</span>
              </Button>
            </div>
          </Col>
        </Row>
        <div className="product-description">
          <ReactMarkdown>{pattern.description}</ReactMarkdown>
        </div>
        <GlobalStyles />
      </Container>

      <style jsx>{`
        .social-media {
          list-style: none;
          padding-left: 0;
          margin-bottom: 0;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }

        .social-media li {
          display: inline-block;
          margin-right: 0.5rem;
        }
        .btn-container {
          width: 100%;
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
        }
        .desktop-breakpoint {
          display: none;
        }
        @media screen and (max-width: 991px) {
          .tablet-breakpoint {
            display: block;
          }
        }

        @media screen and (min-width: 992px) {
          .tablet-breakpoint {
            display: none;
          }

          .desktop-breakpoint {
            display: block;
          }

          .product-description {
            padding-left: 15px;
            padding-right: 15px;
          }
        }
      `}</style>
    </>
  );
};

export default SinglePatternPage;
