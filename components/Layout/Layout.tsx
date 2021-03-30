import { useState, ReactNode } from 'react';
import TopNavbar from '@components/TopNavbar/TopNavbar';
import Sidemenu from '@components/Sidemenu/Sidemenu';
import SidemenuContext from '@context/SidemenuContext';
import Cartmenu from '@components/Cartmenu/Cartmenu';
import CartmenuContext from '@context/CartmenuContext';
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
        <CartmenuContext.Provider value={[shopVisibility, setShopVisibility]}>
          <TopNavbar />
          <Sidemenu />
          <Cartmenu />
          {children}
          <Footer />
        </CartmenuContext.Provider>
      </SidemenuContext.Provider>
    </>
  );
};

export default Layout;
