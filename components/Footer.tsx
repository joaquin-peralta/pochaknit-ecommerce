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
      <Row className="align-items-end">
        <Col xs={5} lg={2}>
          <IconContext.Provider value={{ size: '24px', color: `${colors.darkgray}` }}>
            <div className="mb-2">
              <FaInstagram />
              <Link href="/">
                <a className="social-media">@pochaknit</a>
              </Link>
            </div>
            <div>
              <FaPinterest />
              <Link href="/">
                <a className="social-media">@pochaknit</a>
              </Link>
            </div>
          </IconContext.Provider>
        </Col>
        <Col xs={2} lg={8} className="text-center">
          <a className="powered-by" href="/">
            <small>
              By <strong>JPDevs</strong>
            </small>
          </a>
        </Col>
        <Col xs={5} lg={2}>
          <Row>
            <Col className="text-right">
              <Image
                src="/mercadopago-logo.png"
                alt="Mercadopago"
                layout="intrinsic"
                width={64}
                height={64}
              />
            </Col>
            <Col className="text-right">
              <Image
                src="/paypal-logo.png"
                alt="PayPal"
                layout="intrinsic"
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

      @media screen and (min-width: 768px) {
        .powered-by {
          font-size: 14px;
        }

        .social-media {
          font-size: 14px;
        }
      }
    `}</style>
  </footer>
);

export default Footer;
