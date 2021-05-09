import Head from 'next/head';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import { colors } from '@utils/themes';
import GlobalStyles from '@styles/GlobalStyles';

const AboutPage = () => (
  <>
    <Head>
      <title>Sobre mí - Pocha Knit</title>
    </Head>
    <div className="page">
      <div className="hero-container">
        <div className="bg-wrap">
          <Image
            className="hero-img"
            src="/about-img-hero.jpg"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="bg-text">
          <h2>¡Hola! Soy Virgi...</h2>
          <p className="font-weight-bold">
            ...la persona detrás de POCHA KNIT y quiero darte la bienvenida a mi mundo.
          </p>
        </div>
      </div>
      <Container fluid>
        <p className="mt-3">
          A los 16 años comencé a tejer a crochet y algo a dos agujas, pero desde que conocí el
          mundo de las agujas circulares, no pude parar. Pocha knit nació como el espacio donde
          canalizo mi creatividad y mi pasión por tejer. Me gustan las prendas tejidas con
          prolijidad, con terminaciones impecables y que se sientan como únicas. Acá encontrarás
          patrones de tejidos con diferentes dificultades, en el que cada uno tendrá un patrón
          escrito en PDF más videos complementarios. Una vez realizada la compra, podrás acceder al
          patrón y a los videos a través del perfil de tu cuenta, los cuales estarán de por vida.
          Además, preparé una sección de VIDEOS en donde podrás ver técnicas básicas para el tejido
          a dos agujas, a los cuales podrás recurrir siempre que lo necesites. Te invito a que me
          sigas en Instagram <a href="https://www.instagram.com/pochaknit/">@pochaknit</a> donde me
          encanta mostrarte inspiraciones, consejos y mi día entre lanas y agujas. ¡A disfrutar y
          tejer!
        </p>
        <Container>
          <div className="wrapper">
            <div className="one">
              <Image src="/about-img-1.jpg" width={1600} height={1200} layout="responsive" />
            </div>
            <div className="two">
              <Image src="/about-img-2.jpg" width={1200} height={1600} layout="responsive" />
            </div>
            <div className="three">
              <Image src="/about-img-3.jpg" width={1600} height={1200} layout="responsive" />
            </div>
          </div>
        </Container>
      </Container>
      <GlobalStyles />
    </div>

    <style jsx>{`
      .page {
        width: 100%;
        height: auto;
      }

      .hero-container {
        position: relative;
        width: 100%;
        height: 50vh;
      }
      .bg-wrap {
        width: 100%;
        height: auto;
        overflow: hidden;
      }

      .hero-img {
        z-index: 0;
      }

      .bg-text {
        position: absolute;
        width: 100%;
        z-index: 1;
        color: ${colors.background};
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }

      .one {
        grid-column: 1;
        grid-row: 1;
      }

      .two {
        grid-column: 2;
        grid-row: 1 / 3;
        align-self: center;
      }

      .three {
        grid-column: 1;
        grid-row: 2;
      }
    `}</style>
  </>
);

export default AboutPage;
