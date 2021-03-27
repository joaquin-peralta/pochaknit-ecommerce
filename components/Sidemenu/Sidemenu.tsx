import { useContext } from 'react';
import SidemenuContext from '@context/SidemenuContext';
import Link from 'next/link';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { AiOutlineClose } from 'react-icons/ai';
import { colors } from '@utils/themes';
import SidemenuData from './SidemenuData';

const Sidemenu = () => {
  const [visible, setVisible] = useContext(SidemenuContext);

  const hideMenu = () => {
    setVisible(false);
  };

  const menuTranslation = visible
    ? 'translate3d(0)'
    : 'translate3d(-100%, 0, 0)';

  return (
    <>
      <IconContext.Provider
        value={{ size: '24px', color: `${colors.analogous500}` }}
      >
        <div className="sidemenu">
          <button className="close-btn" type="button" onClick={hideMenu}>
            <AiOutlineClose />
          </button>
          <nav>
            <ul className="list">
              {SidemenuData.map((item) => (
                <Link key={item.title} href={item.path}>
                  <a className="list-anchor">
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
            <Image src="/sheep.png" alt="Una oveja" width={128} height={128} />
            <p className="font-italic">¡No olvides de seguirnos!</p>
          </div>
          <div className="log-in">
            <div className="log-in__content">
              <a>Crear cuenta</a>
              {' | '}
              <a>Iniciar sesión</a>
            </div>
          </div>
        </div>
      </IconContext.Provider>

      <style jsx>{`
        .sidemenu {
          width: 304px;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1003;
          background-color: ${colors.background};
          transition-duration: 0.4s;
          transform: ${menuTranslation};
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
          font-style: italic;
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
          margin-left: 0.5rem;
        }

        .inner-image {
          width: 100%;
          height: 128px;
          text-align: center;
        }

        .log-in {
          position: fixed;
          bottom: 0;
          width: 304px;
          padding-top: 16px;
          padding-bottom: 16px;
        }

        .log-in__content {
          text-align: center;
        }

        .log-in__content a {
          text-decoration: none;
          color: ${colors.darkgray};
        }

        .log-in__content a:first-of-type {
          font-weight: bold;
        }
      `}</style>
    </>
  );
};
export default Sidemenu;
