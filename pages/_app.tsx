import { ElementType } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from '@components/Layout';

interface Props {
  Component: ElementType;
  pageProps: ElementType;
}

function MyApp({ Component, pageProps }: Props) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
