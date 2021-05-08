import { useContext } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import BagContext from '@context/BagContext';
import SidemenuContext from '@context/SidemenuContext';
import CartmenuContext from '@context/CartmenuContext';
import UsermenuContext from '@context/UsermenuContext';
import Link from 'next/link';
import Image from 'next/image';
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
    <header className="header">
      <button type="button" className="menu-btn" onClick={showSidemenu}>
        <AiOutlineMenu />
      </button>
      <Link href="/">
        <a>
          <div className="square-brand">
            <Image src="/square-logo.png" alt="brand" width={72} height={72} />
          </div>
          <div className="brand">
            <Image src="/logo.png" alt="brand" width={179} height={72} />
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
            <AiOutlineUser style={{ fontSize: '24px', color: `${colors.darkgray}` }} />
          </button>
        )}
        {user && (
          <button type="button" className="user-btn" onClick={showUsermenu}>
            <div>
              <div className="position-relative">
                <AiOutlineUser style={{ fontSize: '24px', color: `${colors.darkgray}` }} />
                <div className="user-log-in-alert" />
              </div>
            </div>
          </button>
        )}
        {bag.length === 0 && (
          <button type="button" className="shop-btn" onClick={showCartmenu}>
            <AiOutlineShopping style={{ fontSize: '24px', color: `${colors.darkgray}` }} />
          </button>
        )}
        {bag.length > 0 && (
          <button type="button" className="shop-btn" onClick={showCartmenu}>
            <div>
              <div className="position-relative">
                <AiOutlineShopping style={{ fontSize: '24px', color: `${colors.darkgray}` }} />
                <div className="shopping-bag-alert" />
              </div>
            </div>
          </button>
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

        .shopping-bag-alert {
          position: absolute;
          top: 0;
          right: 10px;
          width: 6px;
          height: 6px;
          background-color: #e90f0f;
          border-radius: 50%;
        }

        @media screen and (min-width: 768px) {
          .square-brand {
            display: none;
          }

          .brand {
            display: block;
            width: 100%;
            height: 72px;
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
  );
};

export default TopNavbar;
