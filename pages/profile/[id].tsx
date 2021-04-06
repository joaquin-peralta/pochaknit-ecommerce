import { useState } from 'react';
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

const ProfilePage = () => {
  const [menu, setMenu] = useState(true);

  const patternButton = () => {
    setMenu(true);
  };

  const videoButton = () => {
    setMenu(false);
  };

  return (
    <Container>
      <Row xs={1} className="text-center py-4 mb-4">
        <Col>
          <Image
            className="avatar"
            src="/chaleco-nina.jpeg"
            width={72}
            height={72}
            layout="intrinsic"
          />
        </Col>
        <Col>
          <p className="font-weight-bold mb-0">Virginia Bonvin</p>
        </Col>
        <Col>
          <small style={{ color: colors.analogous500 }}>
            virginiabonvin@gmail.com
          </small>
        </Col>
      </Row>
      <Row>
        <Col className="text-center pr-0">
          <div className="d-block">
            <button type="button" onClick={patternButton} className="btn-menu">
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
            <button type="button" onClick={videoButton} className="btn-menu">
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
        {menu ? <ProfilePatternItem /> : <ProfileVideoItem />}
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

export default ProfilePage;
