import { useEffect, useContext, useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import UserMenuContext from '@context/UsermenuContext';
import Button from 'react-bootstrap/Button';
import { colors } from '@utils/themes';

const Usermenu = () => {
  const [userMenuVisibility, setUserMenuVisibility] = useContext(UserMenuContext);
  const { user } = useUser();

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (userMenuVisibility === true && !ref.current.contains(event.target)) {
          setUserMenuVisibility(false);
        }
      }

      document.addEventListener('onclick', handleClickOutside);
      return () => {
        document.removeEventListener('onclick', handleClickOutside);
      };
    }, [userMenuVisibility]);
  }

  const sideUserMenuRef = useRef(null);
  useOutsideAlerter(sideUserMenuRef);

  return (
    <div ref={sideUserMenuRef} className={userMenuVisibility ? 'usermenu-open' : 'usermenu'}>
      {!user && (
        <>
          <p className="font-weight-bold">
            ¡Bienvenid@ a <span style={{ color: `${colors.primaryStrong}` }}>Pocha Knit</span>!
          </p>
          <div className="w-75 text-center">
            <Button href="/api/auth/login" className="mb-2" variant="primary" block>
              <span className="log-btn">Iniciar sesión</span>
            </Button>
            <Button href="/api/auth/login" variant="outlinePrimary" block>
              <span className="log-btn">Crear cuenta</span>
            </Button>
          </div>
        </>
      )}
      {user && (
        <>
          <p className="font-weight-bold">
            ¡Hola <span style={{ color: `${colors.primaryStrong}` }}>{user.nickname}</span>!
          </p>
          <div className="w-75 text-center">
            <Button href="/profile" className="mb-2" variant="primary" block>
              <span className="log-btn">Ver perfil</span>
            </Button>
            <Button href="/api/auth/logout" variant="outlinePrimary" block>
              <span className="log-btn">Cerrar sesión</span>
            </Button>
          </div>
        </>
      )}

      <style jsx>{`
        .usermenu {
          display: none;
        }

        .usermenu-open {
          display: none;
        }

        @media screen and (min-width: 992px) {
          .usermenu-open {
            position: fixed;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-flow: column wrap;
            top: 80px;
            right: 72px;
            width: 270px;
            height: 170px;
            z-index: 1001;
            background-color: ${colors.background};
            border: 1px solid #ddd;
            border-radius: 4px;
            box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
          }

          .log-btn {
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 1px;
          }
        }
      `}</style>
    </div>
  );
};

export default Usermenu;
