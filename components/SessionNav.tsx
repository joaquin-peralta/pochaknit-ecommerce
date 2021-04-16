import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { colors } from '@utils/themes';

const SessionNav = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <>
      {!user && (
        <div style={{ color: `${colors.darkgray}` }}>
          <a href="/api/auth/login" className="text-decoration-none text-reset">
            Crear cuenta
          </a>
          {' | '}
          <a
            href="/api/auth/login"
            className="font-weight-bold text-decoration-none text-reset"
          >
            Iniciar sesión
          </a>
        </div>
      )}
      {user && (
        <div className="mt-1 pl-4" style={{ color: `${colors.darkgray}` }}>
          <p className="d-inline-block mb-0">¡Hola {user.nickname}</p>
          {' | '}
          <Link href="/profile">
            <a className="d-inline-block">Ver perfil</a>
          </Link>
        </div>
      )}
    </>
  );
};

export default SessionNav;
