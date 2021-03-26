import Head from 'next/head';
import { colors } from '@utils/themes';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Home</h1>

      <style jsx global>{`
        html {
          box-sizing: border-box;
        }
        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }
        body {
          margin: 0;
          padding: 72px 0 0 0;
          background-color: ${colors.background};
        }
      `}</style>
    </div>
  );
}
