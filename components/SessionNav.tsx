import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { colors } from '@utils/themes';

const SessionNav = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (!user) {
    return (
      <div style={{ color: `${colors.darkgray}` }}>
        <a href="/api/auth/login" className="text-decoration-none text-reset">
          Crear cuenta
        </a>
        {' | '}
        <a href="/api/auth/login" className="font-weight-bold text-decoration-none text-reset">
          Iniciar sesión
        </a>
      </div>
    );
  }

  return (
    <>
      <p className="mb-1">
        ¡Hola <span className="font-weight-bold">{user.nickname}</span>!
      </p>
      <>
        <Link href="/profile">
          <a className="font-weight-bold" style={{ color: `${colors.primaryStrong}` }}>
            Ver perfil
          </a>
        </Link>
        <span className="mx-2">|</span>
        <a href="/api/auth/logout" className="text-decoration-none text-reset">
          Cerrar sesión
        </a>
      </>
    </>
  );
};

export default SessionNav;
