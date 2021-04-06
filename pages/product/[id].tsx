import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MobileCarousel from '@components/MobileCarousel';
import SlideShowGallery from '@components/SlideShowGallery';
import Button from '@components/Button';
import GlobalStyles from '@styles/GlobalStyles';

const ProductPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  // const isTabletOrDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <Container>
      <Row xs={1} md={2}>
        <Col>
          {isMobile && <MobileCarousel />}
          {/* {isTabletOrDesktop && <SlideShowGallery />} */}
        </Col>
        <Col>
          <h3>Chaleco Nina</h3>
          <p>$ 1.499</p>
          <Button variant="primary" text="Realizar compra" />
        </Col>
      </Row>
      <GlobalStyles />
    </Container>
  );
};

export default ProductPage;
