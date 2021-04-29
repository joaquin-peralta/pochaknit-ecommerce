import { useState, ReactNode } from 'react';
import TopNavbar from '@components/TopNavbar';
import Sidemenu from '@components/Sidemenu';
import SidemenuContext from '@context/SidemenuContext';
import Cartmenu from '@components/Cartmenu';
import CartmenuContext from '@context/CartmenuContext';
import Usermenu from '@components/Usermenu';
import UsermenuContext from '@context/UsermenuContext';
import Footer from '@components/Footer';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [shopVisibility, setShopVisibility] = useState(false);
  const [userMenuVisibility, setUserMenuVisibility] = useState(false);

  return (
    <>
      <SidemenuContext.Provider value={[menuVisibility, setMenuVisibility]}>
        <CartmenuContext.Provider value={[shopVisibility, setShopVisibility]}>
          <UsermenuContext.Provider value={[userMenuVisibility, setUserMenuVisibility]}>
            <TopNavbar />
            <Sidemenu />
            <Cartmenu />
            <Usermenu />
            {children}
            <Footer />
          </UsermenuContext.Provider>
        </CartmenuContext.Provider>
      </SidemenuContext.Provider>
    </>
  );
};

export default Layout;
