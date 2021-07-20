import { ReactNode } from 'react';
import TopNavbar from '@components/TopNavbar';
import Footer from '@components/Footer';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <>
    <TopNavbar />
    {children}
    <Footer />
  </>
);

export default Layout;
