import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import SessionNav from '@components/SessionNav';
import GlobalStyles from '@styles/GlobalStyles';
import FeaturedPattern from '@components/FeaturedPattern';
import { Featured } from '@types';

type Props = {
  featured: Featured[];
};

export default function Home({ featured }: Props) {
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

      {featured.map((obj, index) => (
        <Link key={obj.id} href={`/patterns/${obj.pattern.id}`}>
          <a className="text-decoration-none text-reset">
            <FeaturedPattern pattern={obj.pattern} indexOfArray={index} />
          </a>
        </Link>
      ))}

      <GlobalStyles />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const featured: Featured[] = await fetch(
    `${process.env.HOST}/featured-patterns`,
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error(error));

  return {
    props: {
      featured,
    },
  };
};
