import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import FeaturedPattern from '@components/FeaturedPattern';
import { getStrapiUrl } from '@utils/strapi';
import { Pattern } from '@types';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(getStrapiUrl('/patterns?is_featured=true&_sort=published_date:DESC'));
  const patterns = await res.json();

  return {
    props: {
      patterns,
    },
  };
};

type Props = {
  patterns: Pattern[];
};

function Home({ patterns }: Props) {
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setModalShow(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Pocha Knit</title>
      </Head>

      {patterns.map((item, index) => (
        <Link key={item._id} href={`/patterns/${item._id}`}>
          <a className="text-decoration-none text-reset">
            <FeaturedPattern pattern={item} index={index} />
          </a>
        </Link>
      ))}

      <Modal show={modalShow} size="lg" centered onHide={() => setModalShow(false)}>
        <Modal.Body>
          <h4 className="fw-bold">¡30% OFF en toda nuestra web!</h4>
          <p>
            ¡Aprovechá este descuento en todos nuestros patrones hasta el{' '}
            <span className="fw-bold">18/08 inclusive</span>!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)} className="fw-bold">
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Home;
