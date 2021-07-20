import { useContext, useState, useEffect } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
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
import { AiOutlineInfoCircle } from 'react-icons/ai';

export default function CheckoutPage() {
  const { bag } = useContext(BagContext);
  const { user, isLoading, error } = useUser();
  /*   const [paymentStatus, setPaymentStatus] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(null);
  const [showNotification, setShowNotification] = useState(false); */
  /*   const {
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
    if (preference && preference.success) {
      if (process.env.NODE_ENV !== 'production') {
        window.location.assign(preference.data.sandbox_init_point);
      } else {
        window.location.assign(preference.data.init_point);
      }
    }
  }, [preference]); */
  if (error) return <div>Error</div>;

  if (isLoading) return <div>Loading...</div>;

  if (user) {
    return (
      <>
        <Head>
          <title>Checkout - Pocha Knit</title>
        </Head>

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
          <Container className="mt-3">
            <p className="fs-4 fw-bold">Resumen de tu compra</p>
            <Row>
              <Col>
                <SummaryBag items={bag} />
              </Col>
            </Row>
            <Row xs={1} md={2} className="py-4 text-center">
              <Col className="py-2">
                <Button variant="primary">Comprar desde Argentina</Button>
              </Col>
              <Col className="py-2">
                <Button variant="secondary">Comprar desde el Exterior</Button>
              </Col>
            </Row>
          </Container>
        )}
      </>
    );
  }
}
