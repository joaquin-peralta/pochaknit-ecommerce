import { useContext, useEffect, useRef } from 'react';
import CartmenuContext from '@context/CartmenuContext';
import { AiOutlineClose } from 'react-icons/ai';
import { colors } from '@utils/themes';

const Cartmenu = () => {
  const [cartVisibility, setCartVisibility] = useContext(CartmenuContext);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (cartVisibility === true && !ref.current.contains(event.target)) {
          setCartVisibility(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [cartVisibility]);
  }

  const cartMenuRef = useRef(null);
  useOutsideAlerter(cartMenuRef);

  const hideCartMenu = () => {
    setCartVisibility(false);
  };

  return (
    <>
      <div className={cartVisibility ? 'back-layer-show' : 'back-layer'}>
        <div
          ref={cartMenuRef}
          className={cartVisibility ? 'cartmenu-open' : 'cartmenu'}
        >
          <button className="close-btn" type="button" onClick={hideCartMenu}>
            <AiOutlineClose
              style={{ color: `${colors.analogous500}`, fontSize: '24px' }}
            />
          </button>
          <hr className="divisor" />
          <p className="cart-text-info">La bolsa está vacía</p>
        </div>
      </div>

      <style jsx>{`
        .back-layer {
          positon: fixed;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 1002;
          transition-duration: 0.4s;
          transform: translate3d(100%, 0, 0);
          overflow: hidden;
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
        .cartmenu {
          width: 304px;
          height: 100vh;
          position: fixed;
          top: 0;
          right: 0;
          z-index: 1003;
          background-color: ${colors.background};
          transform: translate3d(100%, 0, 0);
        }

        .cartmenu-open {
          width: 304px;
          height: 100vh;
          position: fixed;
          top: 0;
          right: 0;
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
          position: absolute;
          top: 0;
          right: 0;
        }

        .divisor {
          position: absolute;
          top: 72px;
          left: 24px;
          right: 24px;
          color: ${colors.analogous500};
          margin-top: 0;
          margin-bottom: 0;
        }

        .cart-text-info {
          font-style: italic;
          position: absolute;
          top: 88px;
          left: 76px;
        }
      `}</style>
    </>
  );
};

export default Cartmenu;
