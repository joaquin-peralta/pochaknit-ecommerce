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
          <Button href="/api/auth/login" className="mb-2">
            Iniciar sesión
          </Button>
          <Button href="/api/auth/login" variant="outline-primary">
            Crear cuenta
          </Button>
        </>
      )}
      {user && (
        <>
          <Button href="/profile" className="mb-2">
            Ver perfil
          </Button>
          <Button href="/api/auth/logout" variant="outline-primary">
            Cerrar sesión
          </Button>
        </>
      )}

      <style jsx>{`
        .usermenu {
          display: none;
        }
        .usermenu-open {
          position: fixed;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-flow: column wrap;
          top: 72px;
          right: 72px;
          width: 256px;
          height: 128px;
          z-index: 1001;
          background-color: ${colors.background};
          border: 1px solid #ddd;
          border-radius: 4px;
          box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Usermenu;
