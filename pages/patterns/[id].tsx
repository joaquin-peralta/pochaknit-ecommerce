import { GetStaticProps, GetStaticPaths } from 'next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MobileGallery from '@components/MobileCarousel';
import TabletGallery from '@components/SlideShowGallery';
import Button from '@components/Button';
import { colors } from '@utils/themes';
import { IconContext } from 'react-icons';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  FaShareAlt,
  FaWhatsapp,
  FaInstagram,
  FaPinterest,
} from 'react-icons/fa';
import { Pattern } from '@types';
import GlobalStyles from '@styles/GlobalStyles';

type Props = {
  product: Pattern;
};

const SinglePatternPage = ({ product }: Props) => (
  <Container>
    <Row xs={1} md={2} className="py-4 justify-content-between">
      <Col xs md={6}>
        <div className="mobile-breakpoint">
          <MobileGallery images={product.images} />
        </div>
        <div className="tablet-breakpoint">
          <TabletGallery images={product.images} />
        </div>
      </Col>
      <Col xs md={{ span: 4, offset: 1 }} className="pt-5 pb-2">
        <h2 className="mb-3">
          {product.category}{' '}
          <span className="text-uppercase">{product.name}</span>
        </h2>
        <p className="h3">$ {product.price}</p>

        <div className="btn-container">
          <Button variant="primary">
            <AiOutlinePlus /> Agregar a la Bolsa
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
    <div className="product-description">{product.description}</div>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.HOST}/patterns/`);
  const products = await response.json();

  return {
    paths: products.map((product) => ({
      params: { id: String(product.id) },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  const response = await fetch(`${process.env.HOST}/patterns/?id=${id}`);
  const found = await response.json();

  return {
    props: {
      product: found[0],
    },
  };
};

export default SinglePatternPage;
