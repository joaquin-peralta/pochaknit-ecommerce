import { GetStaticProps } from 'next';
import Head from 'next/head';
import GlobalStyles from '@styles/GlobalStyles';
import FeaturedPattern from '@components/FeaturedPattern/FeaturedPattern';

interface Props {
  featuredPatterns: Array<object>;
}

export default function Home({ featuredPatterns }: Props) {
  interface Pattern {
    category: string;
    name: string;
    images: any;
    titleColor: string;
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {featuredPatterns.map((obj: { id: number; pattern: Pattern }, index) => (
        <FeaturedPattern
          key={obj.id}
          category={obj.pattern.category}
          name={obj.pattern.name}
          img={`http://localhost:1337${obj.pattern.images[0].url}`}
          indexOfArray={index + 1}
          titleColor={obj.pattern.titleColor}
        />
      ))}

      <GlobalStyles />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const featuredPatterns = await fetch(
    'http://localhost:1337/featured-patterns',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((response) => response.json());

  return {
    props: {
      featuredPatterns,
    },
  };
};
