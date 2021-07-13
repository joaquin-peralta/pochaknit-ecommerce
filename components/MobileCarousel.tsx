import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';
import { getStrapiMedia } from '@utils/strapi';

type Props = {
  images: any;
};

const MobileCarousel = ({ images }: Props) => (
  <div>
    <Carousel>
      {images.map((image) => (
        <Carousel.Item key={image._id}>
          <div className="d-block w-100">
            <Image
              src={getStrapiMedia(image)}
              alt={image.alternativeText}
              width={900}
              height={1200}
              layout="responsive"
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  </div>
);

export default MobileCarousel;
