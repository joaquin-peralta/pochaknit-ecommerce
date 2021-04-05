import { GetStaticProps } from 'next';
import DetailedPattern from '@components/DetailedPattern';
import GlobalStyles from '@styles/GlobalStyles';
import { Pattern } from '@types';

type Props = {
  patterns: Pattern[];
};

const PatternsPage = ({ patterns }: Props) => (
  <>
    {patterns.map((pattern) => (
      <DetailedPattern key={pattern.id} pattern={pattern} />
    ))}
    <GlobalStyles />
  </>
);

export default PatternsPage;

export const getStaticProps: GetStaticProps = async () => {
  const patterns: object[] = await fetch('http://localhost:1337/patterns', {
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
