import { ReactElement, useState } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import useApi from '@hooks/useApi';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import { AiFillFilePdf } from 'react-icons/ai';
import { FaVideo } from 'react-icons/fa';
import ProfilePatternItem from '@components/ProfilePatternItem';
import ProfileVideoItem from '@components/ProfileVideoItem';
import { colors } from '@utils/themes';
import GlobalStyles from '@styles/GlobalStyles';

export default withPageAuthRequired(function Profile(): ReactElement {
  const { user } = useUser();
  const USER_ID = user.sub.slice(6, user.sub.length);
  const { response, error, isLoading } = useApi(`/api/users/${USER_ID}`);
  const [menu, setMenu] = useState(true);

  const patternButton = () => {
    setMenu(true);
  };

  const videoButton = () => {
    setMenu(false);
  };

  if (isLoading) return <div>Loading profile...</div>;

  if (error) return <div>{error.message}</div>;

  if (user && response) {
    console.log(response.purchases);
    return (
      user && (
        <Container>
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
              <p className="font-weight-bold mb-0">{user.name}</p>
            </Col>
            <Col>
              <small style={{ color: colors.analogous500 }}>{user.email}</small>
            </Col>
          </Row>
          <Row>
            <Col className="text-center pr-0">
              <div className="d-block">
                <button
                  type="button"
                  onClick={patternButton}
                  className="btn-menu"
                >
                  <AiFillFilePdf
                    style={{
                      fontSize: '24px',
                      color: menu
                        ? `${colors.primaryStrong}`
                        : `${colors.darkgray}`,
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
                <button
                  type="button"
                  onClick={videoButton}
                  className="btn-menu"
                >
                  <FaVideo
                    style={{
                      fontSize: '24px',
                      color: menu
                        ? `${colors.darkgray}`
                        : `${colors.primaryStrong}`,
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
            {menu ? (
              <ProfilePatternItem purchases={response.purchases} />
            ) : (
              <ProfileVideoItem purchases={response.purchases} />
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
      )
    );
  }
});
