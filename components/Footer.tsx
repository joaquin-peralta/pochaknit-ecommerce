import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IconContext } from 'react-icons';
import { FaInstagram, FaPinterest } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@styles/components/Footer.module.scss';

const Footer = () => (
  <footer className="pb-3">
    <Container>
      <hr />
      <Row className="justify-content-between">
        <Col>
          <IconContext.Provider value={{ size: '24px', color: `#0a0a0a` }}>
            <div className="mb-2">
              <FaInstagram />
              <Link href="https://www.instagram.com/pochaknit/">
                <a className={styles.socialMedia}>@pochaknit</a>
              </Link>
            </div>
            <div>
              <FaPinterest />
              <Link href="https://ar.pinterest.com/pochaknit/_created/">
                <a className={styles.socialMedia}>@pochaknit</a>
              </Link>
            </div>
          </IconContext.Provider>
        </Col>
        <Col className="text-end">
          <div className={styles.mercadopagoLogo}>
            <Image
              src="/mercadopago-logo.png"
              alt="Mercadopago"
              layout="responsive"
              width={64}
              height={64}
            />
          </div>
          <div className={styles.paypalLogo}>
            <Image src="/paypal-logo.png" alt="PayPal" layout="responsive" width={66} height={64} />
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
