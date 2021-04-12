import { GetStaticProps } from 'next';
import Link from 'next/link';
import DetailedPattern from '@components/DetailedPattern';
import GlobalStyles from '@styles/GlobalStyles';
import { Pattern } from '@types';

type Props = {
  patterns: Pattern[];
};

const ListOfPatternsPage = ({ patterns }: Props) => (
  <>
    {patterns.map((pattern) => (
      <Link key={pattern.id} href={`/pattern/${pattern.id}`}>
        <a className="text-decoration-none text-reset">
          <DetailedPattern pattern={pattern} />
        </a>
      </Link>
    ))}
    <GlobalStyles />
  </>
);

export default ListOfPatternsPage;

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
