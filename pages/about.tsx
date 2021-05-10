import Head from 'next/head';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import ReactMarkdown from 'react-markdown';
import { colors } from '@utils/themes';
import GlobalStyles from '@styles/GlobalStyles';

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.POCHAKNIT_API}/about`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

type Props = {
  data: any;
};

const AboutPage = ({ data }: Props) => (
  <>
    <Head>
      <title>Sobre mí - Pocha Knit</title>
    </Head>
    <div className="page">
      <div className="hero-container">
        <div className="bg-wrap">
          <Image
            className="hero-img"
            src={data.hero.url}
            alt={data.hero.alternativeText}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="bg-text">
          <ReactMarkdown>{data.heroText}</ReactMarkdown>
        </div>
      </div>
      <Container fluid className="py-3">
        <ReactMarkdown>{data.body}</ReactMarkdown>
        <Container>
          <div className="wrapper">
            <div className="one">
              <Image
                src={data.images[0].url}
                alt={data.images[0].alternativeText}
                width={1600}
                height={1200}
                layout="responsive"
              />
            </div>
            <div className="two">
              <Image
                src={data.images[1].url}
                alt={data.images[1].alternativeText}
                width={1200}
                height={1600}
                layout="responsive"
              />
            </div>
            <div className="three">
              <Image
                src={data.images[2].url}
                alt={data.images[2].alternativeText}
                width={1600}
                height={1200}
                layout="responsive"
              />
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
