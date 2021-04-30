import { useContext } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import BagContext from '@context/BagContext';
import SidemenuContext from '@context/SidemenuContext';
import CartmenuContext from '@context/CartmenuContext';
import UsermenuContext from '@context/UsermenuContext';
import Link from 'next/link';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { AiOutlineMenu, AiOutlineShopping, AiOutlineUser } from 'react-icons/ai';
import { colors } from '@utils/themes';
import SidemenuData from '@components/SidemenuData';

const TopNavbar = () => {
  const { bag } = useContext(BagContext);
  // eslint-disable-next-line no-unused-vars
  const [menuVisibility, setMenuVisibility] = useContext(SidemenuContext);
  // eslint-disable-next-line no-unused-vars
  const [shopVisibility, setShopVisibility] = useContext(CartmenuContext);
  // eslint-disable-next-line no-unused-vars
  const [userMenuVisibility, setUserMenuVisibility] = useContext(UsermenuContext);

  const { user } = useUser();

  const showSidemenu = () => {
    setMenuVisibility(true);
  };

  const showCartmenu = () => {
    setShopVisibility(true);
  };

  const showUsermenu = () => {
    setUserMenuVisibility(!userMenuVisibility);
  };

  return (
    <IconContext.Provider value={{ color: `${colors.darkgray}`, size: '24px' }}>
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
              <img src="/logo3.png" alt="brand" />
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
        <div>
          {!user && (
            <button type="button" className="user-btn" onClick={showUsermenu}>
              <AiOutlineUser />
            </button>
          )}
          {user && (
            <button type="button" className="user-btn" onClick={showUsermenu}>
              <div>
                <div className="position-relative">
                  <AiOutlineUser />
                  <div className="user-log-in-alert" />
                </div>
              </div>
            </button>
          )}
          <button type="button" className="shop-btn" onClick={showCartmenu}>
            <AiOutlineShopping />
          </button>
          {bag.length > 0 && (
            <div className="bag-counter-container">
              <small className="mb-0 font-weight-bold">{bag.length}</small>
            </div>
          )}
        </div>

        <style jsx>{`
          .header {
            width: 100%;
            height: 72px;
            background-color: ${colors.background};
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            top: 0;
            z-index: 1000;
            border-bottom: 1px solid #ddd;
          }

          .menu-btn {
            width: 72px;
            height: 72px;
            border: 0;
            background-color: ${colors.background};
            border-bottom: 1px solid #ddd;
          }

          .user-btn {
            display: none;
          }

          .shop-btn {
            width: 72px;
            height: 72px;
            border: 0;
            background-color: ${colors.background};
            border-bottom: 1px solid #ddd;
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
            color: ${colors.darkgray};
            font-weight: 700;
            text-transform: uppercase;
          }

          .list-anchor:hover {
            color: ${colors.analogous500};
          }

          .list-item {
            display: inline-block;
            padding: 1rem 1.5rem;
          }

          .bag-counter-container {
            position: fixed;
            top: 12px;
            right: 12px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: ${colors.background};
            display: flex; /* or inline-flex */
            align-items: center;
            justify-content: center;
          }

          .bag-counter {
            position: absolute;
            top: 50%;
            left: 35%;
          }

          @media screen and (min-width: 768px) {
            .square-brand {
              display: none;
            }

            .brand {
              display: block;
              position: relative;
              width: 197px;
              height: 72px;
            }

            .brand img {
              position: absolute;
              top: -30px;
              left: 0;
              width: 100%;
              height: auto;
            }
          }

          @media screen and (min-width: 992px) {
            .header {
              display: flex;
              padding-left: 18px;
              height: 82px;
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

            .shop-btn {
              height: 82px;
            }

            .user-btn {
              display: inline-block;
              width: 36px;
              height: 82px;
              border: 0;
              background-color: ${colors.background};
              border-bottom: 1px solid #ddd;
            }

            .user-log-in-alert {
              position: absolute;
              top: 0;
              right: -6px;
              width: 6px;
              height: 6px;
              background-color: #e90f0f;
              border-radius: 50%;
            }
          }
        `}</style>
      </header>
    </IconContext.Provider>
  );
};

export default TopNavbar;
