import { ElementType } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import CartProvider from '@context/CartContext';
import Layout from '@components/Layout';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '@styles/global.scss';
import MaintenanceMode from '@components/MaintenanceMode';

interface Props {
  Component: ElementType;
  pageProps: ElementType;
}

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: Props) {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE) {
    return <MaintenanceMode />;
  }

  return (
    <UserProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </UserProvider>
  );
}

export default MyApp;
