import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IconContext } from 'react-icons';
import { FaInstagram, FaPinterest } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { colors } from '@utils/themes';

const Footer = () => (
  <footer>
    <Container>
      <hr />
      <Row className="align-items-end">
        <Col xs={4}>
          <IconContext.Provider
            value={{ size: '18px', color: `${colors.darkgray}` }}
          >
            <div className="d-block">
              <FaInstagram />
              <Link href="/">
                <a className="social-media">@pochaknit</a>
              </Link>
            </div>
            <div className="d-inline-block">
              <FaPinterest />
              <Link href="/">
                <a className="social-media">@pochaknit</a>
              </Link>
            </div>
          </IconContext.Provider>
        </Col>
        <Col xs={4} className="text-center">
          <a className="powered-by" href="/">
            <small>
              By <strong>JPDevs</strong>
            </small>
          </a>
        </Col>
        <Col xs={4}>
          <Row>
            <Col className="text-right">
              <Image
                src="/mercadopago-logo.png"
                alt="Mercadopago"
                width={64}
                height={64}
              />
            </Col>
            <Col className="text-right">
              <Image
                src="/paypal-logo.png"
                alt="PayPal"
                width={64}
                height={64}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>

    <style jsx>{`
      .social-media {
        font-size: 12px;
        margin-left: 4px;
        text-decoration: none;
        color: ${colors.darkgray};
      }

      .social-media:hover {
        color: ${colors.analogous500};
      }

      .powered-by {
        text-decoration: none;
        color: ${colors.darkgray};
        font-size: 12px;
      }

      .payment-img {
        display: inline-block;
        width: 48px;
        height: 80px;
      }

      @media screen and (min-width: 768px) {
        .powered-by {
          font-size: 14px;
        }
      }
    `}</style>
  </footer>
);

export default Footer;
