import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';

type Props = {
  images: any;
};

const MobileCarousel = ({ images }: Props) => (
  <div>
    <Carousel>
      {images.map((image) => (
        <Carousel.Item key={image.id}>
          <div className="d-block w-100">
            <Image
              src={`http://localhost:1337${image.url}`}
              width={900}
              height={1124}
              layout="responsive"
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  </div>
);

export default MobileCarousel;
