import { GetStaticProps } from 'next';
import Head from 'next/head';
import GlobalStyles from '@styles/GlobalStyles';
import FeaturedPattern from '@components/FeaturedPattern';
import { Pattern } from '@types';

const API_URL = 'http://localhost:1337/featured-patterns';

type Props = {
  patterns: Pattern[];
};

export default function Home({ patterns }: Props) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {patterns.map((pattern, index) => (
        <FeaturedPattern
          key={pattern.id}
          pattern={pattern}
          indexOfArray={index}
        />
      ))}

      <GlobalStyles />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const patterns: Pattern[] = await fetch(API_URL, {
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
