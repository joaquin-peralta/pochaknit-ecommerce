import { useContext, useState, useEffect } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { postData } from '@utils/fetcher';
import Head from 'next/head';
import useSWR from 'swr';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import BagContext from '@context/BagContext';
import SummaryBag from '@components/SummaryBag';
import Loader from 'react-loader-spinner';
import { colors } from '@utils/themes';
import { FiAlertTriangle } from 'react-icons/fi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import GlobalStyles from '@styles/GlobalStyles';

export default withPageAuthRequired(function CheckoutPage() {
  const router = useRouter();
  const { bag } = useContext(BagContext);
  const { user } = useUser();
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const {
    data: preference,
    error: preferenceError,
    mutate: mutatePreference,
  } = useSWR(
    paymentStatus ? '/api/mercadopago/create_preference' : null,
    () => postData('/api/mercadopago/create_preference', { bag }),
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );
  const { data: verification, error: verificationError } = useSWR(
    sendingEmail ? 'api/verification' : null,
    () => postData('api/verification', { user_id: user.sub }),
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  useEffect(
    () => () => {
      mutatePreference({ ...preference, preference }, false);
    },
    [user],
  );

  useEffect(() => {
    if (preference) {
      if (preference.success) {
        router.push(preference.data.sandbox_init_point);
      }
    }
  }, [preference]);

  if (user) {
    return (
      <>
        <Head>
          <title>Checkout - Pocha Knit</title>
        </Head>
        <div className="page">
          {bag.length === 0 && (
            <Alert variant="info">
              <AiOutlineInfoCircle style={{ fontSize: '24px' }} />{' '}
              <span>Bolsa de compra vacía. Ver más</span>{' '}
              <Link href="/patterns">
                <a className="font-weight-bold">patrones.</a>
              </Link>
            </Alert>
          )}
          {bag.length > 0 && (
            <Container fluid>
              {paymentStatus && !preferenceError && (
                <div className="loader-container">
                  <div className="loader">
                    <Loader type="TailSpin" color={colors.primaryStrong} height={100} width={100} />
                    <p className="mt-4 mb-0">Redireccionando a Mercadopago.</p>
                    <p className="mb-0">Por favor espera.</p>
                  </div>
                </div>
              )}
              <Row xs={1} lg={2} className="align-items-center">
                <Col>
                  <SummaryBag items={bag} />
                </Col>
                <Col>
                  <Container className="py-4">
                    <Row className="justify-content-center mb-4">
                      <Col xs={9}>
                        <Button
                          onClick={() => setPaymentStatus(true)}
                          variant="primary"
                          block
                          disabled={!user.email_verified || paymentStatus}
                        >
                          Comprar desde Argentina
                        </Button>
                        {preferenceError && (
                          <Alert variant="danger">
                            No se ha podido procesar la solicitud. Por favor inténtelo nuevamente.
                          </Alert>
                        )}
                      </Col>
                    </Row>
                    <Row className="justify-content-center mb-4">
                      <Col xs={9}>
                        <Button
                          variant="secondary"
                          block
                          disabled={paymentStatus && !user.email_verified}
                          onClick={() => setShowNotification(true)}
                        >
                          Comprar desde el Exterior
                        </Button>
                        {showNotification && (
                          <div className="mt-2">
                            <Alert variant="info">
                              <AiOutlineInfoCircle />{' '}
                              <small>
                                Muy pronto estará habilitado el pago a través de PayPal. Si querés
                                realizar el pago en este momento mandanos un mail a{' '}
                                <span className="font-weight-bold">pochaknit@gmail.com</span>
                              </small>
                            </Alert>
                          </div>
                        )}
                      </Col>
                    </Row>
                    {!user.email_verified && (
                      <Row>
                        <Col>
                          <Alert variant="warning">
                            <FiAlertTriangle />
                            <small className="ml-2 font-weight-bold">
                              Por favor verifica tu cuenta para poder realizar la compra. Si aun no
                              has reicibido un mail de verificación, revisa tu correo spam o
                              presiona{' '}
                              <Button
                                className="p-0"
                                variant="link"
                                onClick={() => setSendingEmail(true)}
                              >
                                <strong>aquí</strong>
                              </Button>{' '}
                              para reenviarlo.
                            </small>
                          </Alert>
                          {verification && (
                            <Alert variant="success">
                              <small>Mail de verificación enviado.</small>
                            </Alert>
                          )}
                          {verificationError && (
                            <Alert variant="danger">
                              <small>No se ha podido enviar el mail. Intente de nuevo.</small>
                            </Alert>
                          )}
                        </Col>
                      </Row>
                    )}
                  </Container>
                </Col>
              </Row>
            </Container>
          )}
          <GlobalStyles />
        </div>

        <style jsx>{`
          .page {
            height: auto;
          }
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
            background-color: ${colors.background};
            padding: 2rem 1rem;
            border-radius: 8px;
          }
        `}</style>
      </>
    );
  }
});
