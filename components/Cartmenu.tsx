import { useContext, useState, useEffect, useRef } from 'react';
import CartmenuContext from '@context/CartmenuContext';
import { AiOutlineClose, AiOutlineShopping } from 'react-icons/ai';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@components/Button';
import CartmenuItem from '@components/CartmenuItem';
import { colors } from '@utils/themes';

const Cartmenu = () => {
  const [cartVisibility, setCartVisibility] = useContext(CartmenuContext);
  const [cartItems, setCartItems] = useState([]);

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
          <Container>
            <Row className="justify-content-end">
              <Col xs="auto" className="px-0">
                <button
                  className="close-btn"
                  type="button"
                  onClick={hideCartMenu}
                >
                  <AiOutlineClose
                    style={{
                      color: `${colors.analogous500}`,
                      fontSize: '24px',
                    }}
                  />
                </button>
              </Col>
            </Row>
            <hr className="divisor" />
            {cartItems.length === 0 && (
              <p className="cart-text-info">La bolsa está vacía</p>
            )}
            <hr />

            {cartItems.length > 0 && (
              <div>
                {cartItems.map((item) => (
                  <CartmenuItem />
                ))}
                <Row className="justify-content-center py-1">
                  <Col xs="auto">
                    <Button variant="primary">
                      <div className="px-5">
                        <AiOutlineShopping
                          style={{ fontSize: '24px', paddingBottom: '3px' }}
                        />
                        <p className="d-inline-block mb-0 ml-2">Ver Bolsa</p>
                      </div>
                    </Button>
                  </Col>
                </Row>
              </div>
            )}
          </Container>
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
        }

        .divisor {
          color: ${colors.analogous500};
          margin-top: 0;
          margin-bottom: 0;
        }

        .cart-text-info {
          font-style: italic;
        }

        .cart-items {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Cartmenu;
