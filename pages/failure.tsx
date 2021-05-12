import { useEffect, useContext } from 'react';
import BagContext from '@context/BagContext';
import { useUser } from '@auth0/nextjs-auth0';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { FaTimesCircle } from 'react-icons/fa';
import Loader from 'react-loader-spinner';

import { colors } from '@utils/themes';
import GlobalStyles from '@styles/GlobalStyles';

export default function SuccessPage() {
  const { user, isLoading } = useUser();

  const { cleanBag } = useContext(BagContext);

  useEffect(() => {
    if (user) {
      cleanBag();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader">
          <Loader type="TailSpin" color={colors.primaryStrong} height={100} width={100} />
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <Alert variant="danger">
          <FaTimesCircle />
          <span className="ml-2 font-weight-bold">Pago cancelado.</span>
        </Alert>
        <Container fluid>
          <h3>Lo sentimos...</h3>
          <span className="mr-2">No se ha podido efectuar tu compra.</span>
        </Container>
        <GlobalStyles />

        <style jsx>{`
          .loader-container {
            position: fixed;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.2);
            z-index: 2999;
            padding: 0;
          }
          .loader {
            position: fixed;
            z-index: 3000;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
          }
        `}</style>
      </>
    );
  }
}
