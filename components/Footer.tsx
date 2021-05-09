import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IconContext } from 'react-icons';
import { FaInstagram, FaPinterest } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { colors } from '@utils/themes';

const Footer = () => (
  <footer className="pb-3">
    <Container>
      <hr />
      <Row className="justify-content-between">
        <Col>
          <IconContext.Provider value={{ size: '24px', color: `${colors.darkgray}` }}>
            <div className="mb-2">
              <FaInstagram />
              <Link href="https://www.instagram.com/pochaknit/">
                <a className="social-media">@pochaknit</a>
              </Link>
            </div>
            <div>
              <FaPinterest />
              <Link href="https://ar.pinterest.com/pochaknit/_created/">
                <a className="social-media">@pochaknit</a>
              </Link>
            </div>
          </IconContext.Provider>
        </Col>
        <Col className="text-right">
          <div className="mercadopago-logo">
            <Image
              src="/mercadopago-logo.png"
              alt="Mercadopago"
              layout="responsive"
              width={64}
              height={64}
            />
          </div>
          <div className="paypal-logo">
            <Image src="/paypal-logo.png" alt="PayPal" layout="responsive" width={66} height={64} />
          </div>
        </Col>
      </Row>
    </Container>

    <style jsx>{`
      .social-media {
        font-size: 1rem;
        margin-left: 4px;
        text-decoration: none;
        color: ${colors.darkgray};
      }

      .social-media:hover {
        color: ${colors.analogous500};
      }

      .mercadopago-logo {
        display: inline-block;
        width: 64px;
        height: 64px;
        margin-right: 1rem;
      }

      .paypal-logo {
        display: inline-block;
        width: 64px;
        height: 64px;
      }
    `}</style>
  </footer>
);

export default Footer;
