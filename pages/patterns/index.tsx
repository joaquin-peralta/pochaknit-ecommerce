import { GetStaticProps } from 'next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import DetailedPattern from '@components/DetailedPattern';
import GlobalStyles from '@styles/GlobalStyles';
import { Pattern } from '@types';

type Props = {
  patterns: Pattern[];
};

const PatternsPage = ({ patterns }: Props) => (
  <Container>
    <Row xs={1} md={2}>
      {patterns.map((pattern) => (
        <Col key={pattern.id}>
          <Link href={`/pattern/${pattern.id}`}>
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

export const getStaticProps: GetStaticProps = async () => {
  const patterns: object[] = await fetch(`${process.env.HOST}/patterns`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());

  return {
    props: {
      patterns,
    },
  };
};
