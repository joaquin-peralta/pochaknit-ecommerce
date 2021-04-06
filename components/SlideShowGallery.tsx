import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import GlobalStyles from '@styles/GlobalStyles';

const SlideShowGallery = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    '/medias-lola.jpeg',
    '/chaleco-nina.jpeg',
    '/medias-lola.jpeg',
    '/medias-lola.jpeg',
    '/medias-lola.jpeg',
    '/medias-lola.jpeg',
  ];

  const plus = () => {
    if (slideIndex === slides.length - 1) {
      setSlideIndex(0);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };

  const substract = () => {
    if (slideIndex <= 0) {
      setSlideIndex(slides.length - 1);
    } else {
      setSlideIndex(slideIndex - 1);
    }
  };

  const currentSlide = (n: number) => {
    setSlideIndex(n);
  };

  const slideActive = (i: number) => {
    const slideFocus = slideIndex === i ? 'slide-active' : '';
    return slideFocus;
  };

  return (
    <Container className="gallery-container">
      <div className={slideIndex === 0 ? 'show' : 'hide'}>
        <Image src={slides[0]} width={900} height={1124} layout="responsive" />
      </div>
      <div className={slideIndex === 1 ? 'show' : 'hide'}>
        <Image src={slides[1]} width={900} height={1124} layout="responsive" />
      </div>
      <div className={slideIndex === 2 ? 'show' : 'hide'}>
        <Image src={slides[2]} width={900} height={1124} layout="responsive" />
      </div>
      <div className={slideIndex === 3 ? 'show' : 'hide'}>
        <Image src={slides[3]} width={900} height={1124} layout="responsive" />
      </div>
      <div className={slideIndex === 4 ? 'show' : 'hide'}>
        <Image src={slides[4]} width={900} height={1124} layout="responsive" />
      </div>
      <div className={slideIndex === 5 ? 'show' : 'hide'}>
        <Image src={slides[5]} width={900} height={1124} layout="responsive" />
      </div>

      <Row className="align-items-center py-2">
        <Col className="px-0 text-center">
          <button type="button" className="prev" onClick={substract}>
            &#10094;
          </button>
        </Col>
        <Col className="px-2">
          <div>
            <Image
              className={`slide-thumbnail ${slideActive(0)}`}
              src={slides[0]}
              width={1124}
              height={1124}
              layout="responsive"
              onClick={() => currentSlide(0)}
            />
          </div>
        </Col>
        <Col className="px-2">
          <Image
            className={`slide-thumbnail ${slideActive(1)}`}
            src={slides[1]}
            width={1124}
            height={1124}
            layout="responsive"
            onClick={() => currentSlide(1)}
          />
        </Col>
        <Col className="px-2">
          <Image
            className={`slide-thumbnail ${slideActive(2)}`}
            src={slides[2]}
            width={1124}
            height={1124}
            layout="responsive"
            onClick={() => currentSlide(2)}
          />
        </Col>
        <Col className="px-2">
          <Image
            className={`slide-thumbnail ${slideActive(3)}`}
            src={slides[3]}
            width={1124}
            height={1124}
            layout="responsive"
            onClick={() => currentSlide(3)}
          />
        </Col>
        <Col className="px-2">
          <Image
            className={`slide-thumbnail ${slideActive(4)}`}
            src={slides[4]}
            width={1124}
            height={1124}
            layout="responsive"
            onClick={() => currentSlide(4)}
          />
        </Col>
        <Col className="px-2">
          <Image
            className={`slide-thumbnail ${slideActive(5)}`}
            src={slides[5]}
            width={1124}
            height={1124}
            layout="responsive"
            onClick={() => currentSlide(5)}
          />
        </Col>
        <Col className="px-0 text-center">
          <button type="button" className="next" onClick={plus}>
            &#10095;
          </button>
        </Col>
      </Row>

      <GlobalStyles />

      <style jsx>{`
        .gallery-container {
          position: relative;
        }

        .show {
          display: block;
        }

        .hide {
          display: none;
        }

        .cursor {
          cursor: pointer;
        }

        .prev,
        .next {
          cursor: pointer;
          border: 0;
          background: transparent;
          color: #222;
          width: auto;
          font-size: 20px;
          border-radius: 0 3px 3px 0;
          user-select: none;
          -webkit-user-select: none;
        }

        .next {
          right: 0;
          border-radius: 3px 0 0 3px;
        }
      `}</style>
    </Container>
  );
};

export default SlideShowGallery;
