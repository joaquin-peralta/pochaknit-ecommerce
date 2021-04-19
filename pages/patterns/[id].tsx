import { useContext, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import BagContext from '@context/BagContext';
import useLocalStorage from '@hooks/useLocalStorage';
import localStorage from '@utils/localStorage';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MobileGallery from '@components/MobileCarousel';
import TabletGallery from '@components/SlideShowGallery';
import Button from 'react-bootstrap/Button';
import { colors } from '@utils/themes';
import { IconContext } from 'react-icons';
import {
  FaShareAlt,
  FaWhatsapp,
  FaInstagram,
  FaPinterest,
} from 'react-icons/fa';
import { Pattern } from '@types';
import GlobalStyles from '@styles/GlobalStyles';

type Props = {
  pattern: Pattern;
};

const SinglePatternPage = ({ pattern }: Props) => {
  const { bag, addToBag } = useContext(BagContext);

  const handleAddToBag = (product: Pattern) => {
    addToBag(product);
    window.localStorage.setItem(String(product.id), JSON.stringify(product));
  };

  const isDisabled = (product: Pattern) => {
    if (bag.length !== 0) {
      for (const element of bag) {
        if (element.id === product.id) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <Container>
      <Row xs={1} md={2} className="py-4 justify-content-between">
        <Col xs md={6}>
          <div className="mobile-breakpoint">
            <MobileGallery images={pattern.images} />
          </div>
          <div className="tablet-breakpoint">
            <TabletGallery images={pattern.images} />
          </div>
        </Col>
        <Col xs md={{ span: 4, offset: 1 }} className="pt-5 pb-2">
          <h2 className="mb-3">
            {pattern.category}{' '}
            <span className="text-uppercase">{pattern.name}</span>
          </h2>
          <p className="h3">$ {pattern.price}</p>

          <div className="btn-container">
            <Button
              variant="primary"
              onClick={() => handleAddToBag(pattern)}
              disabled={isDisabled(pattern)}
            >
              Añadir a la bolsa
            </Button>
          </div>

          <ul className="social-media">
            <IconContext.Provider
              value={{ size: '24px', color: `${colors.primary800}` }}
            >
              <li>
                <FaWhatsapp />
              </li>
              <li>
                <FaInstagram />
              </li>
              <li>
                <FaPinterest />
              </li>
            </IconContext.Provider>
            <li>
              <FaShareAlt className="ml-2 mr-1" />
              Share
            </li>
          </ul>
        </Col>
      </Row>
      <div className="product-description">{pattern.description}</div>
      <GlobalStyles />

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
          width: 11rem;
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
        }
        .tablet-breakpoint {
          display: none;
        }
        @media screen and (max-width: 767px) {
          .mobile-breakpoint {
            display: block;
          }
        }

        @media screen and (min-width: 768px) {
          .mobile-breakpoint {
            display: none;
          }

          .tablet-breakpoint {
            display: block;
          }

          .product-description {
            padding-left: 15px;
            padding-right: 15px;
          }
        }
      `}</style>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.HOST}/patterns/`);
  const patterns = await response.json();

  return {
    paths: patterns.map((pattern) => ({
      params: { id: String(pattern.id) },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  const response = await fetch(`${process.env.HOST}/patterns/?id=${id}`);
  const found = await response.json();

  return {
    props: {
      pattern: found[0],
    },
  };
};

export default SinglePatternPage;
