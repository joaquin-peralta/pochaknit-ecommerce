import { ReactNode } from 'react';
import TopNavbar from '@components/TopNavbar/TopNavbar';
import Sidemenu from '@components/Sidemenu/Sidemenu';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <div>
    <TopNavbar />
    <Sidemenu />
    {children}
  </div>
);

export default Layout;
