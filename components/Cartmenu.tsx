import { useContext, useEffect, useRef } from 'react';
import CartmenuContext from '@context/CartmenuContext';
import Image from 'next/image';
import { AiOutlineClose, AiOutlineShopping } from 'react-icons/ai';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@components/Button';
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
            {/* <p className="cart-text-info">La bolsa está vacía</p> */}

            <Row className="py-4 align-items-center">
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
              <Col xs={3} className="text-center">
                <button type="button" className="btn-cancel-item">
                  <AiOutlineClose />
                </button>
              </Col>
            </Row>
            <Row className="justify-content-end py-2">
              <Col xs="auto">
                <p className="mb-0 h4">Total</p>
                <p className="mb-0 h4">$ 1.490</p>
              </Col>
            </Row>
            <hr />
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

        .btn-cancel-item {
          border: 0;
          background: transparent;
        }
      `}</style>
    </>
  );
};

export default Cartmenu;
