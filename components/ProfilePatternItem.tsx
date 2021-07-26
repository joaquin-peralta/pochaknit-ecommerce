import { useEffect } from 'react';
import useSWR from 'swr';
import Paper from '@material-ui/core/Paper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import Alert from 'react-bootstrap/Alert';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import InfoIcon from '@material-ui/icons/Info';
import { Pattern } from '@types';
import { getStrapiUrl, getStrapiMedia } from '@utils/strapi';
import useMediaQuery from '@material-ui/core/useMediaQuery';

type Props = {
  itemId: string;
  pending?: boolean;
  paymentId: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProfilePatternItem = ({ itemId, pending = false, paymentId }: Props) => {
  const matches = useMediaQuery('(min-width:768px)');
  const { data, error } = useSWR<Pattern>(getStrapiUrl(`/patterns/${itemId}`), fetcher);
  const { data: payment } = useSWR(pending ? `/api/mercadopago/${paymentId}` : null, fetcher);

  useEffect(() => {
    if (payment && payment.status === 'approved') {
      fetch(`/api/purchase/${paymentId}?status=approved`, { method: 'PATCH' }).then((res) =>
        console.log(res.json()),
      );
    }
  }, [payment]);

  if (!data && !error) return <div>Loading...</div>;

  if (error) return <div>No se pudo cargar el patrón...</div>;

  return (
    <Container fluid>
      <Paper>
        <Row className="align-items-center">
          <Col xs={4}>
            <Image
              src={getStrapiMedia(data.images[0])}
              alt={data.images[0].alternativeText}
              width={128}
              height={176}
            />
          </Col>
          <Col xs={4}>
            <p className="mb-0">
              {data.category} {data.name}
            </p>
          </Col>
          <Col xs={4} className="text-center">
            {data.files.urls.map((url) => (
              <Button key={url} href={url} disabled={pending}>
                {matches && <span>Descargar</span>}
                <GetAppIcon />
              </Button>
            ))}
          </Col>
        </Row>
        {pending && (
          <Row>
            <Col>
              <Alert variant="info">
                <InfoIcon /> Aún se está procesando tu pago. ¡No te preocupes! Una vez aprobado se
                habilitará la descarga del patrón.
              </Alert>
            </Col>
          </Row>
        )}
      </Paper>
    </Container>
  );
};

ProfilePatternItem.defaultProps = {
  pending: false,
};

export default ProfilePatternItem;
