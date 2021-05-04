import { useContext, useEffect, useRef } from 'react';
import SidemenuContext from '@context/SidemenuContext';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { AiOutlineClose } from 'react-icons/ai';
import { FaInstagram, FaPinterest } from 'react-icons/fa';
import { colors } from '@utils/themes';
import SessionNav from '@components/SessionNav';
import SidemenuData from './SidemenuData';

const Sidemenu = () => {
  const [menuVisibility, setMenuVisibility] = useContext(SidemenuContext);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (menuVisibility === true && !ref.current.contains(event.target)) {
          setMenuVisibility(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [menuVisibility]);
  }

  const sideMenuRef = useRef(null);
  useOutsideAlerter(sideMenuRef);

  const hideMenu = () => {
    setMenuVisibility(false);
  };

  return (
    <>
      <IconContext.Provider value={{ size: '24px', color: `${colors.darkgray}` }}>
        <div className={menuVisibility ? 'back-layer-show' : 'back-layer'}>
          <div ref={sideMenuRef} className={menuVisibility ? 'sidemenu-open' : 'sidemenu'}>
            <button className="close-btn" type="button" onClick={hideMenu}>
              <AiOutlineClose />
            </button>
            <nav>
              <ul className="list font-weight-bold">
                {SidemenuData.map((item) => (
                  <Link key={item.title} href={item.path}>
                    <a
                      className="list-anchor"
                      onClick={hideMenu}
                      onKeyDown={hideMenu}
                      role="link"
                      tabIndex={0}
                    >
                      <li className="list-item">
                        <span>{item.icon}</span>
                        <span className="list-item__title">{item.title}</span>
                      </li>
                    </a>
                  </Link>
                ))}
              </ul>
            </nav>
            <div className="inner-image">
              <img src="/sheep.png" alt="Una oveja" />
            </div>
            <p className="font-italic text-center h6 py-2">¡No olvides de seguirnos!</p>
            <div className="text-center">
              <a href="#" className="mr-3">
                <FaInstagram />
              </a>
              <a href="#">
                <FaPinterest />
              </a>
            </div>
            <div className="log-in">
              <SessionNav />
            </div>
          </div>
        </div>
      </IconContext.Provider>

      <style jsx>{`
        .back-layer {
          position: fixed;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 1002;
          transition-duration: 0.4s;
          transform: translate3d(-100%, 0, 0);
        }

        .back-layer-show {
          position: fixed;
          width: 100%;
          height: 100vh;
          top: 0;
          left: 0;
          z-index: 1002;
          background-color: rgba(0, 0, 0, 0.6);
          transform: translate3d(0);
        }
        .sidemenu {
          width: 304px;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1003;
          background-color: ${colors.background};
          transform: translate3d(-100%, 0, 0);
        }

        .sidemenu-open {
          width: 304px;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1003;
          background-color: ${colors.background};
          transition-duration: 0.5s;
          transform: translate3d(0);
        }

        .close-btn {
          width: 72px;
          height: 72px;
          border: 0;
          background-color: ${colors.background};
        }

        .list {
          list-style: none;
          padding-left: 16px;
          padding-right: 16px;
        }

        .list-anchor {
          text-decoration: none;
          color: ${colors.darkgray};
        }

        .list-item {
          width: 100%;
          height: 72px;
          display: flex;
          align-items: center;
          padding-left: 8px;
          padding-right: 8px;
        }

        .list-item__title {
          font-size: 18px;
          text-transform: uppercase;
          margin-left: 0.5rem;
        }

        .inner-image {
          width: 100%;
          height: auto;
          text-align: center;
        }

        .log-in {
          position: fixed;
          bottom: 0;
          width: 304px;
          padding-top: 16px;
          padding-bottom: 16px;
          text-align: center;
        }
      `}</style>
    </>
  );
};
export default Sidemenu;
