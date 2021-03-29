import Head from 'next/head';
import GlobalStyles from '@styles/GlobalStyles';
import FeaturedPattern from '@components/FeaturedPattern/FeaturedPattern';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FeaturedPattern />
      <FeaturedPattern />

      <GlobalStyles />
    </>
  );
}
