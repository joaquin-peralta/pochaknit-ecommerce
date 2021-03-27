import Head from 'next/head';
import { useContext } from 'react';
import SidemenuContext from '@context/SidemenuContext';
import { colors } from '@utils/themes';

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const [visible, setVisible] = useContext(SidemenuContext);
  const backgroundColor = visible
    ? `${colors.darkenBackground}`
    : `${colors.background}`;

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
          color: ${colors.darkgray};
          background-color: ${backgroundColor};
        }
      `}</style>
    </div>
  );
}
