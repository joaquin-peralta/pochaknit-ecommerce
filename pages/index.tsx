import { Pattern } from '@types';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import FeaturedPattern from '@components/FeaturedPattern';
import GlobalStyles from '@styles/GlobalStyles';

type Featured = {
  id: string;
  pattern: Pattern;
};

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.HOST}/featured-patterns`);
  const featured: Featured[] = await res.json();

  return {
    props: {
      featured,
    },
  };
};

const Home = ({ featured }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <Head>
      <title>Create Next App</title>
    </Head>
    {featured.map((item, index) => (
      <Link key={item.id} href={`/patterns/${item.pattern.id}`}>
        <a className="text-decoration-none text-reset">
          <FeaturedPattern pattern={item.pattern} indexOfArray={index} />
        </a>
      </Link>
    ))}
    <GlobalStyles />
  </>
);

export default Home;
