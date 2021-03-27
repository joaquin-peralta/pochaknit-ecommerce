import Head from 'next/head';
import GlobalStyles from '@styles/GlobalStyles';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Home</h1>

      <GlobalStyles />
    </>
  );
}
