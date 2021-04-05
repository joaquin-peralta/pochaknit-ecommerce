import Image from 'next/image';

type Props = {
  images: object;
};

const BASE_URL = 'http://localhost:1337';

const QuiltedImages = ({ images }: Props) => (
  <>
    <div className="wrapper">
      <div className="one">
        <Image
          src={BASE_URL + images[0].url}
          width={900}
          height={1124}
          layout="responsive"
        />
      </div>
      <div className="two">
        <Image
          src={BASE_URL + images[1].url}
          width={900}
          height={1124}
          layout="responsive"
        />
      </div>
      <div className="three">
        <Image
          src={BASE_URL + images[2].url}
          width={900}
          height={1124}
          layout="responsive"
        />
      </div>
    </div>

    <style jsx>{`
      .wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 6px;
      }

      .one {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
      }

      .two {
        grid-column: 1;
        grid-row: 2;
      }

      .three {
        grid-column: 2;
        grid-row: 2;
      }

      @media screen and (min-width: 768px) {
        .wrapper {
          grid-template-columns: repeat(3, 1fr);
        }
        .one {
          grid-column: 1 / 3;
          grid-row: 1 / 3;
        }

        .two {
          grid-column: 3;
          grid-row: 1;
        }

        .three {
          grid-column: 3;
          grid-row: 2;
        }
      }
    `}</style>
  </>
);

export default QuiltedImages;
