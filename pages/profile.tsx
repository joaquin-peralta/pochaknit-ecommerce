import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import Avatar from '@components/Avatar';
import ProfileTabPanel from '@components/ProfileTabPanel';
import { Profile } from '@types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function ProfilePage() {
  const { user, isLoading, error } = useUser();
  const { data: profile, error: profileError } = useSWR<Profile>(
    user ? `/api/user/${user.sub}` : null,
    fetcher,
  );

  if (error) return <p>Error. No pudimos cargar tu perfil.</p>;

  if (isLoading) return <p>Cargando...</p>;

  if (profileError) return <div>No pudimos cargar tu perfil... Intenta de nuevo más tarde.</div>;

  return (
    <>
      <Avatar picture={user.picture} nickname={user.nickname} email={user.email} />
      <ProfileTabPanel profile={profile} />
    </>
  );
}

export default withPageAuthRequired(ProfilePage);
