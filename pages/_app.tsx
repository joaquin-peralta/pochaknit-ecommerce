import { ElementType } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from '@components/Layout';

interface Props {
  Component: ElementType;
  pageProps: ElementType;
}

function MyApp({ Component, pageProps }: Props) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
