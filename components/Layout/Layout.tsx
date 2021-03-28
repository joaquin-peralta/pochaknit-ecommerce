import { useState, ReactNode } from 'react';
import TopNavbar from '@components/TopNavbar/TopNavbar';
import Sidemenu from '@components/Sidemenu/Sidemenu';
import SidemenuContext from '@context/SidemenuContext';
import Sideshopbag from '@components/Sideshopbag/Sideshopbag';
import SideshopbagContext from '@context/SideshopbagContext';
import Footer from '@components/Footer/Footer';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [shopVisibility, setShopVisibility] = useState(false);

  return (
    <>
      <SidemenuContext.Provider value={[menuVisibility, setMenuVisibility]}>
        <SideshopbagContext.Provider
          value={[shopVisibility, setShopVisibility]}
        >
          <TopNavbar />
          <Sidemenu />
          <Sideshopbag />
          {children}
          <Footer />
        </SideshopbagContext.Provider>
      </SidemenuContext.Provider>
    </>
  );
};

export default Layout;
