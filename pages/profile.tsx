/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { InferGetStaticPropsType } from 'next';
import useSWR from 'swr';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { AiFillFilePdf } from 'react-icons/ai';
import { FaVideo } from 'react-icons/fa';
import ProfilePatternItem from '@components/ProfilePatternItem';
import ProfileVideoItem from '@components/ProfileVideoItem';
import { Pattern, Profile } from '@types';
import { colors } from '@utils/themes';
import GlobalStyles from '@styles/GlobalStyles';

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.HOST}/patterns`);
  const patterns: Pattern[] = await res.json();

  return {
    props: {
      patterns,
    },
  };
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProfilePage = ({ patterns }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { user, isLoading, error } = useUser();
  const [menu, setMenu] = useState(true);
  const [purchases, setPurchases] = useState<Pattern[]>([]);
  const [userID, setUserID] = useState('');
  const { data: profile } = useSWR<Profile>(userID ? `/api/user/${userID}` : null, fetcher);

  useEffect(() => {
    if (user) {
      setUserID(user.sub.slice(6, user.sub.length));
    }
  }, []);

  useEffect(() => {
    if (profile) {
      if (profile.purchases.length > 0) {
        for (const pattern of patterns) {
          if (profile.purchases.includes(pattern.id)) {
            setPurchases([...purchases, pattern]);
          }
        }
      }
    }
  }, [profile]);

  const patternButton = () => {
    setMenu(true);
  };

  const videoButton = () => {
    setMenu(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <>
        <h2>Error</h2>
        <p>{error.message}</p>
      </>
    );
  }

  return (
    <Container>
      <>
        <div className="text-right">
          <a href="/api/auth/logout">Cerrar sesión</a>
        </div>
        <Row xs={1} className="text-center py-4 mb-4">
          <Col>
            <Image
              className="avatar"
              src={user.picture}
              alt={user.nickname}
              width={72}
              height={72}
              layout="intrinsic"
            />
          </Col>
          <Col>
            <p className="font-weight-bold mb-0">{user.nickname}</p>
          </Col>
          <Col>
            <small style={{ color: colors.analogous500 }}>{user.email}</small>
          </Col>
        </Row>
      </>
      <Row>
        <Col className="text-center pr-0">
          <div className="d-block">
            <button type="button" onClick={patternButton} className="btn-menu">
              <AiFillFilePdf
                style={{
                  fontSize: '24px',
                  color: menu ? `${colors.primaryStrong}` : `${colors.darkgray}`,
                }}
              />
            </button>
          </div>
          <small>Patrones</small>
          <hr
            style={{
              borderTop: menu
                ? `2px solid ${colors.primaryStrong}`
                : '1px solid rgba(0, 0, 0, 0.1)',
            }}
          />
        </Col>
        <Col className="text-center pl-0">
          <div className="d-block">
            <button type="button" onClick={videoButton} className="btn-menu">
              <FaVideo
                style={{
                  fontSize: '24px',
                  color: menu ? `${colors.darkgray}` : `${colors.primaryStrong}`,
                }}
              />
            </button>
          </div>
          <small>Videos</small>
          <hr
            style={{
              borderTop: menu
                ? '1px solid rgba(0, 0, 0, 0.1)'
                : `2px solid ${colors.primaryStrong}`,
            }}
          />
        </Col>
      </Row>
      <div className="items-container">
        {!profile && <div>Cargando patrones...</div>}
        {profile && (
          <>
            {menu ? (
              <ProfilePatternItem purchases={purchases} />
            ) : (
              <ProfileVideoItem purchases={purchases} />
            )}
          </>
        )}
      </div>
      <GlobalStyles />

      <style jsx>{`
        .items-container {
          height: 50vh;
        }

        .btn-menu {
          border: 0;
          background: transparent;
        }
      `}</style>
    </Container>
  );
};

export default withPageAuthRequired(ProfilePage);
