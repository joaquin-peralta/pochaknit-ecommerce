import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import GlobalStyles from '@styles/GlobalStyles';

type Props = {
  images: any;
};

const SlideShowGallery = ({ images }: Props) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const plus = () => {
    if (slideIndex === images.length - 1) {
      setSlideIndex(0);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };

  const substract = () => {
    if (slideIndex <= 0) {
      setSlideIndex(images.length - 1);
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
    <>
      <Container className="gallery-container">
        {images.map((image, index) => (
          <div key={image._id} className={slideIndex === index ? 'show' : 'hide'}>
            <Image
              src={image.url}
              alt={image.alternativeText}
              width={900}
              height={1200}
              layout="responsive"
            />
          </div>
        ))}

        <Row className="flex-nowrap align-items-center py-2">
          <Col className="px-0 text-center">
            <button type="button" className="prev" onClick={substract}>
              &#10094;
            </button>
          </Col>

          {images.map((image, index) => (
            <Col key={image._id} className="px-2">
              <div className="thumbnail-image">
                <Image
                  className={`slide-thumbnail ${slideActive(index)}`}
                  src={image.url}
                  alt={image.alternativeText}
                  layout="fill"
                  objectFit="contain"
                  onClick={() => currentSlide(index)}
                />
              </div>
            </Col>
          ))}

          <Col className="px-0 text-center">
            <button type="button" className="next" onClick={plus}>
              &#10095;
            </button>
          </Col>
        </Row>
      </Container>

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

        .thumbnail-image {
          width: 48px;
          height: 48px;
        }
      `}</style>
    </>
  );
};

export default SlideShowGallery;
