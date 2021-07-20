import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import DetailedPattern from '@components/DetailedPattern';
import { getStrapiUrl } from '@utils/strapi';
import { Pattern } from '@types';

export const getStaticProps = async () => {
  const res = await fetch(getStrapiUrl('/patterns'));
  const patterns: Pattern[] = await res.json();

  return {
    props: {
      patterns,
    },
  };
};

const PatternsPage = ({ patterns }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <Head>
      <title>Patrones - Pocha Knit</title>
    </Head>
    <Container>
      <Row xs={1} md={2}>
        {patterns.map((pattern) => (
          <Col key={pattern._id}>
            <Link href={`/patterns/${pattern._id}`}>
              <a className="text-decoration-none text-reset">
                <DetailedPattern pattern={pattern} />
              </a>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  </>
);

export default PatternsPage;
