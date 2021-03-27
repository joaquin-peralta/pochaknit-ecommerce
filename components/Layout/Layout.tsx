import { useState, ReactNode } from 'react';
import TopNavbar from '@components/TopNavbar/TopNavbar';
import Sidemenu from '@components/Sidemenu/Sidemenu';
import SidemenuContext from '@context/SidemenuContext';
import Sideshopbag from '@components/Sideshopbag/Sideshopbag';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <SidemenuContext.Provider value={[visible, setVisible]}>
        <TopNavbar />
        <Sidemenu />
        <Sideshopbag />
        {children}
      </SidemenuContext.Provider>
    </>
  );
};

export default Layout;
