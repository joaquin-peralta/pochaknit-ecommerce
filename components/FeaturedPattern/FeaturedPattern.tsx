import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'next/image';
import isOdd from 'is-odd';

interface Props {
  category: string;
  name: string;
  img: string;
  titleColor: string;
  indexOfArray: number;
}

const FeaturedPattern = ({
  category,
  name,
  img,
  titleColor,
  indexOfArray,
}: Props) => {
  const [alignText, setAlignText] = useState('');
  const [alignImg, setAlignImg] = useState('');

  useEffect(() => {
    if (isOdd(indexOfArray)) {
      setAlignText('2');
      setAlignImg('1');
    } else {
      setAlignText('1');
      setAlignImg('2');
    }
  }, []);

  return (
    <>
      <Container className="py-4">
        <div className="wrapper">
          <div className="one">
            <h4 className="title font-italic">
              <span>New</span> in
            </h4>
          </div>
          <div className="two">
            <Image src={img} layout="intrinsic" width={900} height={1124} />
          </div>
          <div className="three">
            <h2 className="title">
              {category} <span style={{ fontSize: '1.2em' }}>{name}</span>
            </h2>
          </div>
        </div>
      </Container>

      <style jsx>{`
        .wrapper {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: auto;
        }

        .one {
          grid-column: 1 / 3;
          grid-row: 1;
        }

        .two {
          grid-column: 1 / 3;
          grid-row: 2;
        }

        .three {
          grid-column: 1 / 3;
          grid-row: 3;
        }
        .title,
        .title span {
          color: ${titleColor};
          text-align: center;
          text-transform: uppercase;
        }

        @media screen and (min-width: 768px) {
          .one {
            grid-column: ${alignText};
            grid-row: 1;
            align-self: end;
          }

          .two {
            grid-column: ${alignImg};
            grid-row: 1 / 3;
          }

          .three {
            grid-column: ${alignText};
            grid-row: 2;
          }
        }
      `}</style>
    </>
  );
};

export default FeaturedPattern;
