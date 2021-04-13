import { GetStaticProps } from 'next';
import Head from 'next/head';
import SessionNav from '@components/SessionNav';
import GlobalStyles from '@styles/GlobalStyles';
import FeaturedPattern from '@components/FeaturedPattern';
import { FtPattern } from '@types';

type Props = {
  data: FtPattern[];
};

export default function Home({ data }: Props) {
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

      <SessionNav />

      {data.map((item, index) => (
        <FeaturedPattern
          key={item.id}
          pattern={item.pattern}
          indexOfArray={index}
        />
      ))}

      <GlobalStyles />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data: FtPattern[] = await fetch(
    `${process.env.HOST}/featured-patterns`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((response) => response.json());

  return {
    props: {
      data,
    },
  };
};
