import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import isOdd from 'is-odd';

interface Props {
  type: string;
  name: string;
  img: string;
  alt: string;
  titleColor: string;
  indexOfArray: number;
}

const FeaturedPattern = ({
  type,
  name,
  img,
  alt,
  titleColor = 'red',
  indexOfArray,
}: Props) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (isOdd(indexOfArray)) {
      setPosition(0);
    } else {
      setPosition(12);
    }
  }, []);

  return (
    <div className="py-5">
      <div className="mobile">
        <Container>
          <Row>
            <Col>
              <h4 className="title font-italic">
                <span>New</span> in
              </h4>
              <Image
                src={img}
                alt={alt}
                layout="intrinsic"
                width={900}
                height={1124}
              />
              <h2 className="title">
                {type} <span style={{ fontSize: '1.2em' }}>{name}</span>
              </h2>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="tablet">
        <Container>
          <Row className="align-items-center">
            <Col md={{ order: position }}>
              <Image
                src={img}
                alt={alt}
                layout="intrinsic"
                width={900}
                height={1124}
              />
            </Col>
            <Col>
              <h4 className="title font-italic">
                <span>New</span> in
              </h4>
              <h2 className="title">
                {type} <span style={{ fontSize: '1.2em' }}>{name}</span>
              </h2>
            </Col>
          </Row>
        </Container>
      </div>

      <style jsx>{`
        .title,
        .title span {
          color: ${titleColor};
          text-align: center;
          text-transform: uppercase;
        }
        .tablet {
          display: none;
        }

        @media screen and (min-width: 768px) {
          .mobile {
            display: none;
          }

          .tablet {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedPattern;
