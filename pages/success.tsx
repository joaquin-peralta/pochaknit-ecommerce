import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { CartContext } from '@context/CartContext';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FiCheckCircle } from 'react-icons/fi';
import { Profile, Purchase } from '@types';
import CircularProgress from '@material-ui/core/CircularProgress';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const putData = (url: string, data: any) =>
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

const revalidationOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export default function SuccessPage() {
  const router = useRouter();
  const { user } = useUser();
  const { cleanCart } = useContext(CartContext);
  const { data: profile, error: profileError } = useSWR<Profile>(
    user ? `/api/user/${user.sub}` : null,
    fetcher,
    revalidationOptions,
  );
  const { data: payment, error: paymentError } = useSWR(
    user ? `/api/mercadopago/payments/${router.query.payment_id}` : null,
    fetcher,
    revalidationOptions,
  );
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (user && router.query) {
      cleanCart();
    }
  }, [user && router.query]);

  useEffect(() => {
    if (profile && payment) {
      // prevents adding payment again by reloading page
      if (
        !profile.purchases.map((purchase) => purchase.paymentId).includes(payment.id.toString())
      ) {
        const newPurchase: Purchase = {
          itemsIds: payment.additional_info.items.map((item) => item.id),
          paymentMethod: 'mercadopago',
          paymentId: payment.id,
          status: payment.status,
        };

        const updatedPurchases = profile.purchases.map((item) => item).concat(newPurchase);
        putData(`/api/user/${user.sub}`, { purchases: updatedPurchases })
          .then((res) => res.json())
          .then(() => setIsUpdated(true))
          .catch((err) => console.error(err));
      } else {
        setIsUpdated(true);
      }
    }
  }, [profile, payment]);

  if (profileError || paymentError) {
    return (
      <>
        <span className="fs-3 fw-bold">Ha ocurrido un error insesperado...</span>
        <span>
          Por favor verifica que tengas conexión a internet. De ser así haz click{' '}
          <Button variant="link" className="fw-bold" onClick={() => router.reload()}>
            aquí
          </Button>{' '}
          para actualizar tus datos nuevamente.{' '}
        </span>
      </>
    );
  }

  if (!isUpdated) {
    return (
      <div className="text-center p-5" style={{ color: '#5cadef' }}>
        <CircularProgress color="inherit" size={75} />
        <span className="d-block mt-2 fw-bold" style={{ color: '#0a0a0a' }}>
          Actualizando tu perfil...
        </span>
      </div>
    );
  }

  return (
    <>
      <Alert variant="success">
        <FiCheckCircle />
        <span className="ms-2 fw-bold">Pago aprobado.</span>
      </Alert>
      <Container fluid>
        <h3>¡Gracias por tu compra!</h3>
        <p>
          Podrás visualizar en{' '}
          <Link href="/profile">
            <a className="fw-bold">tu perfil</a>
          </Link>{' '}
          todos los patrones adquiridos. <span className="fw-bold">¡Happy knitting!</span>
        </p>
      </Container>
    </>
  );
}
