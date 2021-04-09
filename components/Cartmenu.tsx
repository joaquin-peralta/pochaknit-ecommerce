import { useContext, useEffect, useRef } from 'react';
import CartmenuContext from '@context/CartmenuContext';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
          {/* <p className="cart-text-info">La bolsa está vacía</p> */}

          <div className="cart-items">
            <Container>
              <Row className="justify-content-between py-4">
                <Col xs={3}>
                  <Image
                    src="/chaleco-nina.jpeg"
                    width={72}
                    height={72}
                    layout="responsive"
                  />
                </Col>
                <Col xs={6}>
                  <p className="mb-0">Chaleco NINA</p>
                  <small>$ 1.490</small>
                </Col>
                <Col xs={3}>
                  <button type="button" className="btn-cancel-item">
                    <AiOutlineClose />
                  </button>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>

      <style jsx>{`
        .back-layer {
          position: fixed;
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

        .cart-items {
          position: absolute;
          top: 88px;
          width: 100%;
        }

        .btn-cancel-item {
          border: 0;
          background: transparent;
        }
      `}</style>
    </>
  );
};

export default Cartmenu;
