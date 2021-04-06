import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';

const MobileCarousel = () => (
  <Carousel>
    <Carousel.Item>
      <Image
        src="/medias-lola.jpeg"
        width={900}
        height={1124}
        layout="responsive"
      />
    </Carousel.Item>
    <Carousel.Item>
      <Image
        src="/medias-lola.jpeg"
        width={900}
        height={1124}
        layout="responsive"
      />
    </Carousel.Item>
    <Carousel.Item>
      <Image
        src="/medias-lola.jpeg"
        width={900}
        height={1124}
        layout="responsive"
      />
    </Carousel.Item>
    <Carousel.Item>
      <Image
        src="/medias-lola.jpeg"
        width={900}
        height={1124}
        layout="responsive"
      />
    </Carousel.Item>
  </Carousel>
);

export default MobileCarousel;
