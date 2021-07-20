import { useEffect } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import ProfileVideoInnerItem from '@components/ProfileVideoInnerItem';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InfoIcon from '@material-ui/icons/Info';
import { getStrapiUrl, getStrapiMedia } from '@utils/strapi';
import { Pattern } from '@types';

type Props = {
  itemId: string;
  pending?: boolean;
  paymentId: string;
  purchaseId: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProfileVideoItem = ({ itemId, pending = false, paymentId, purchaseId }: Props) => {
  const { data, error } = useSWR<Pattern>(getStrapiUrl(`/patterns/${itemId}`), fetcher);
  const { data: payment } = useSWR(pending ? `/api/mercadopago/${paymentId}` : null, fetcher);

  useEffect(() => {
    if (payment && payment.status === 'approved') {
      fetch(`/api/purchase/${purchaseId}?status=approved`, { method: 'PATCH' }).then((res) =>
        console.log(res.json()),
      );
    }
  }, [payment]);

  if (!data && !error) return <div>Loading...</div>;

  if (error) return <div>No se pudieron cargar los videos...</div>;

  return (
    <Container fluid>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
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
        </AccordionSummary>
        <AccordionDetails>
          <ProfileVideoInnerItem videos={data.videos} />
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

ProfileVideoItem.defaultProps = {
  pending: false,
};

export default ProfileVideoItem;
