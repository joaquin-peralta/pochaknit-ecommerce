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

      <FeaturedPattern
        type="medias"
        name="lola"
        img="/medias-lola.jpeg"
        alt="medias"
        titleColor="green"
        indexOfArray={1}
      />
      <FeaturedPattern
        type="chaleco"
        name="nina"
        img="/chaleco-nina.jpeg"
        alt="chaleco de lana"
        titleColor="red"
        indexOfArray={2}
      />

      <GlobalStyles />
    </>
  );
}
