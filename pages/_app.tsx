import { ElementType } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from '@components/Layout';
import BagContext from '@context/BagContext';
import useInitialBagState from '@hooks/useInitialBagState';

interface Props {
  Component: ElementType;
  pageProps: ElementType;
}

function MyApp({ Component, pageProps }: Props) {
  const initialBagState = useInitialBagState();
  return (
    <UserProvider>
      <BagContext.Provider value={initialBagState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BagContext.Provider>
    </UserProvider>
  );
}

export default MyApp;
