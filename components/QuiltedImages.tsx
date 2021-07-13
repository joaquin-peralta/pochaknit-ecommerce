import Image from 'next/image';
import { getStrapiMedia } from '@utils/strapi';

type Props = {
  images: any;
};

const QuiltedImages = ({ images }: Props) => (
  <>
    <div className="wrapper">
      <div className="one">
        <Image src={getStrapiMedia(images[0])} width={900} height={1200} layout="responsive" />
      </div>
      <div className="two">
        <Image src={getStrapiMedia(images[1])} width={900} height={1200} layout="responsive" />
      </div>
      <div className="three">
        <Image src={getStrapiMedia(images[2])} width={900} height={1200} layout="responsive" />
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
