import { InferGetStaticPropsType } from 'next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import DetailedPattern from '@components/DetailedPattern';
import GlobalStyles from '@styles/GlobalStyles';
import { Pattern } from '@types';

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.HOST}/patterns`);
  const patterns: Pattern[] = await res.json();

  return {
    props: {
      patterns,
    },
  };
};

const PatternsPage = ({ patterns }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Container>
    <Row xs={1} md={2}>
      {patterns.map((pattern) => (
        <Col key={pattern.id}>
          <Link href={`/patterns/${pattern.id}`}>
            <a className="text-decoration-none text-reset">
              <DetailedPattern pattern={pattern} />
            </a>
          </Link>
        </Col>
      ))}
    </Row>
    <GlobalStyles />
  </Container>
);

export default PatternsPage;
