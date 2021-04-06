import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MobileCarousel from '@components/MobileCarousel';
import SlideShowGallery from '@components/SlideShowGallery';
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
import GlobalStyles from '@styles/GlobalStyles';

const ProductPage = () => (
  <Container>
    <Row xs={1} md={2} className="py-4">
      <Col md={8} lg>
        <div className="mobile-breakpoint">
          <MobileCarousel />
        </div>
        <div className="tablet-breakpoint">
          <SlideShowGallery />
        </div>
      </Col>
      <Col md={4} lg className="py-4">
        <h3>Chaleco Nina</h3>
        <p className="h5">$ 1.499</p>
        <div className="btn-container pt-3 pb-1">
          <Button variant="primary">Realizar compra</Button>
        </div>
        <div className="btn-container pt-1 pb-3">
          <Button variant="secondary">
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
    <div>
      <h3>Lorem Ipsum</h3>
      <p>
        Nam maximus lectus nec dui efficitur vulputate. Quisque at magna
        posuere, faucibus urna ac, sollicitudin nisl. Aliquam interdum dolor
        vitae felis lobortis, vitae blandit elit consectetur. Proin posuere
        iaculis ullamcorper. Pellentesque ac ipsum quis nisl sodales sagittis.
        Sed porttitor ipsum nec ex scelerisque, vitae condimentum tortor
        vehicula. Pellentesque fermentum nec felis in condimentum. Duis nunc
        tellus, fermentum eu dolor porta, hendrerit pulvinar dolor. In accumsan
        finibus tellus non mollis. Vestibulum ac ligula nunc. Fusce ultricies et
        turpis ac tempus. Maecenas condimentum quam nec nunc pulvinar, id
        placerat metus luctus. Integer ut nunc finibus, tristique nibh nec,
        aliquam ex. Pellentesque turpis risus, imperdiet vitae rhoncus vitae,
        maximus ut tortor. Suspendisse pretium ornare nisi a ultrices. Cras et
        ligula fringilla, aliquam lorem in, rutrum nisi. Sed condimentum erat
        sit amet faucibus ullamcorper. Maecenas aliquet quis enim eu maximus.
        Cras maximus, nisl ac convallis vulputate, ligula libero pellentesque
        sem, sed suscipit leo massa congue turpis. Vestibulum posuere eros a
        erat tempus, id sagittis ipsum cursus. Donec non pretium mi. Donec diam
        nunc, pharetra id ante ut, tincidunt eleifend ante. Quisque quis laoreet
        ante, id eleifend magna. Praesent aliquet vestibulum ipsum ac molestie.
        Nunc fringilla, enim tristique mollis accumsan, dui turpis posuere nunc,
        eu porta nibh leo ac risus. Mauris feugiat, urna sed lacinia vehicula,
        lorem velit convallis magna, eget hendrerit metus mi ac est.
      </p>
    </div>
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
      }
    `}</style>
  </Container>
);

export default ProductPage;
