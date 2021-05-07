import { useState, useEffect, useContext } from 'react';
import BagContext from '@context/BagContext';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { putData } from '@utils/fetcher';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { FaTimesCircle } from 'react-icons/fa';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FailurePage() {
  const router = useRouter();
  const { user } = useUser();
  const [userID, setUserID] = useState('');
  const { cleanBag } = useContext(BagContext);
  const { data: profile } = useSWR(userID ? `/api/user/${userID}` : null, fetcher);
  const { data: dbUpdate } = useSWR(
    profile ? 'updateDatabase' : null,
    () => putData(`/api/user/${userID}`, { tempPurchase: [] }),
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  useEffect(() => {
    if (user) {
      cleanBag();
      setUserID(user.sub.slice(6, user.sub.length));
      console.log(router.query);
    }
  }, [user]);

  useEffect(() => {
    if (dbUpdate) {
      console.log(dbUpdate);
    }
  }, [dbUpdate]);

  if (!dbUpdate) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Alert variant="danger">
        <FaTimesCircle />
        <span className="ml-2 font-weight-bold">No se ha podido procesar tu pago.</span>
      </Alert>
    </Container>
  );
}
