import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'next/image';
import isOdd from 'is-odd';
import { Pattern } from '@types';
import { getStrapiMedia } from '@utils/strapi';

type Props = {
  pattern: Pattern;
  indexOfArray: number;
};

const FeaturedPattern = ({ pattern, indexOfArray }: Props) => {
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
      <Container fluid>
        <div className="wrapper">
          <div className="one">
            <p className="title font-italic">
              <span>New</span> in
            </p>
          </div>
          <div className="two">
            <Image
              src={getStrapiMedia(pattern.images[0])}
              width={900}
              height={1200}
              layout="responsive"
            />
          </div>
          <div className="three">
            <p className="title name">
              {pattern.category} <span style={{ fontSize: '1.2em' }}>{pattern.name}</span>
            </p>
          </div>
        </div>
      </Container>

      <style jsx>{`
        .wrapper {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: auto;
          margin-bottom: 5rem;
        }

        .one {
          grid-column: 1 / 3;
          grid-row: 2;
        }

        .two {
          grid-column: 1 / 3;
          grid-row: 1;
        }

        .featured-img {
          width: 900px;
          height: 1124px;
        }

        .three {
          grid-column: 1 / 3;
          grid-row: 3;
        }

        .title {
          margin-top: 1rem;
          line-height: 0.5;
          font-size: 1.5rem;
          font-weight: 700;
        }
        .title,
        .title span {
          color: ${pattern.primaryColor};
          text-align: center;
          text-transform: uppercase;
        }

        .name {
          font-size: 2rem;
          font-weight: 700;
        }

        @media screen and (min-width: 768px) {
          .wrapper {
            margin-bottom: 0;
          }
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

        @media screen and (min-width: 992px) {
          .title {
            margin-top: 0;
            line-height: 1;
            font-size: 2.6rem;
          }

          .name {
            font-size: 3rem;
          }
        }
      `}</style>
    </>
  );
};

export default FeaturedPattern;
