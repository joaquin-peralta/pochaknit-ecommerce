import { GetStaticProps } from 'next';
import DetailedPattern from '@components/DetailedPattern';
import GlobalStyles from '@styles/GlobalStyles';

export interface Pattern {
  category: string;
  name: string;
  images: any;
  titleColor: string;
}
const PatternsPage = (props) => {
  const { patterns } = props;
  console.log(patterns);

  return (
    <>
      <h1>caca</h1>
      <GlobalStyles />
    </>
  );
};

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
