import { ElementType } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import Layout from '@components/Layout';
import BagContext from '@context/BagContext';
import useInitialState from '@hooks/useInitialState';
import Router from 'next/router';
// Components
import NProgress from 'nprogress';
// Styles
import 'nprogress/nprogress.css';
import '@styles/global.scss';

interface Props {
  Component: ElementType;
  pageProps: ElementType;
}

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: Props) {
  const initialState = useInitialState();
  return (
    <UserProvider>
      <BagContext.Provider value={initialState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BagContext.Provider>
    </UserProvider>
  );
}

export default MyApp;
