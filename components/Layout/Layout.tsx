import { ReactNode } from 'react';
import TopNavbar from '@components/TopNavbar/TopNavbar';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <div>
    <TopNavbar />
    {children}
  </div>
);

export default Layout;
