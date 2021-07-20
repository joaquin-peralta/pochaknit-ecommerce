import Head from 'next/head';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import ReactMarkdown from 'react-markdown';
import { getStrapiUrl, getStrapiMedia } from '@utils/strapi';
import styles from '@styles/pages/About.module.scss';

export const getStaticProps = async () => {
  const res = await fetch(getStrapiUrl('/about'));
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
    <div className={styles.page}>
      <div className={styles.heroContainer}>
        <div className={styles.bgWrap}>
          <Image
            className={styles.heroImg}
            src={getStrapiMedia(data.hero)}
            alt={data.hero.alternativeText}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className={styles.bgText}>
          <ReactMarkdown>{data.heroText}</ReactMarkdown>
        </div>
      </div>
      <Container fluid className="py-3">
        <ReactMarkdown>{data.body}</ReactMarkdown>
        <Container>
          <div className={styles.Wrapper}>
            <div className={styles.one}>
              <Image
                src={getStrapiMedia(data.images[0])}
                alt={data.images[0].alternativeText}
                width={1600}
                height={1200}
                layout="responsive"
              />
            </div>
            <div className={styles.two}>
              <Image
                src={getStrapiMedia(data.images[1])}
                alt={data.images[1].alternativeText}
                width={1200}
                height={1600}
                layout="responsive"
              />
            </div>
            <div className={styles.three}>
              <Image
                src={getStrapiMedia(data.images[2])}
                alt={data.images[2].alternativeText}
                width={1600}
                height={1200}
                layout="responsive"
              />
            </div>
          </div>
        </Container>
      </Container>
    </div>
  </>
);

export default AboutPage;
