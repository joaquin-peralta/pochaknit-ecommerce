import { useContext } from 'react';
import SidemenuContext from '@context/SidemenuContext';
import CartmenuContext from '@context/CartmenuContext';
import Link from 'next/link';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { AiOutlineMenu, AiOutlineShopping } from 'react-icons/ai';
import { colors } from '@utils/themes';
import SidemenuData from '@components/Sidemenu/SidemenuData';

const TopNavbar = () => {
  // eslint-disable-next-line no-unused-vars
  const [menuVisibility, setMenuVisibility] = useContext(SidemenuContext);
  // eslint-disable-next-line no-unused-vars
  const [shopVisibility, setShopVisibility] = useContext(CartmenuContext);

  const showSidemenu = () => {
    setMenuVisibility(true);
  };

  const showCartmenu = () => {
    setShopVisibility(true);
  };

  return (
    <IconContext.Provider value={{ color: '#fff', size: '24px' }}>
      <header className="header">
        <button type="button" className="menu-btn" onClick={showSidemenu}>
          <AiOutlineMenu />
        </button>
        <Link href="/">
          <a>
            <div className="square-brand">
              <Image src="/square-logo.png" alt="logo" width={72} height={72} />
            </div>
            <div className="brand">
              <Image src="/logo.png" alt="logo" width={197} height={72} />
            </div>
          </a>
        </Link>
        <nav>
          <ul className="list">
            {SidemenuData.map((item) => (
              <Link key={item.title} href={item.path}>
                <a className="list-anchor">
                  <li className="list-item">{item.title}</li>
                </a>
              </Link>
            ))}
          </ul>
        </nav>
        <button type="button" className="shop-btn" onClick={showCartmenu}>
          <AiOutlineShopping />
        </button>

        <style jsx>{`
          .header {
            width: 100%;
            height: 72px;
            background-color: ${colors.primary};
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            top: 0;
            z-index: 1000;
          }

          .menu-btn {
            width: 72px;
            height: 72px;
            border: 0;
            background-color: ${colors.primary};
          }

          .shop-btn {
            width: 72px;
            height: 72px;
            border: 0;
            background-color: ${colors.primary};
          }

          .square-brand {
            width: 72px;
            height: 72px;
          }

          .brand {
            display: none;
          }

          nav {
            display: none;
          }

          .list {
            display: none;
            list-style: none;
            padding-left: 0;
            margin-bottom: 0;
            width: 100%;
          }

          .list-anchor {
            text-decoration: none;
            color: #fff;
            font-style: italic;
          }

          .list-anchor:hover {
            color: ${colors.analogous500};
          }

          .list-item {
            display: inline-block;
            padding: 1rem 1.5rem;
          }

          @media screen and (min-width: 768px) {
            .square-brand {
              display: none;
            }

            .brand {
              display: block;
              width: 197px;
              height: 72px;
            }
          }

          @media screen and (min-width: 992px) {
            .header {
              display: flex;
              padding-left: 18px;
            }
            .menu-btn {
              display: none;
            }

            nav {
              display: block;
              flex: 1;
              text-align: end;
              margin-right: 2rem;
            }

            .list {
              display: block;
              flex: 1;
            }
          }
        `}</style>
      </header>
    </IconContext.Provider>
  );
};

export default TopNavbar;
