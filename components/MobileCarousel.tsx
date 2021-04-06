import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';

const MobileCarousel = () => (
  <div>
    <Carousel>
      <Carousel.Item>
        <div className="d-block w-100">
          <Image
            src="/medias-lola.jpeg"
            width={900}
            height={1124}
            layout="responsive"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="d-block w-100">
          <Image
            src="/medias-lola.jpeg"
            width={900}
            height={1124}
            layout="responsive"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="d-block w-100">
          <Image
            src="/medias-lola.jpeg"
            width={900}
            height={1124}
            layout="responsive"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="d-block w-100">
          <Image
            src="/medias-lola.jpeg"
            width={900}
            height={1124}
            layout="responsive"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="d-block w-100">
          <Image
            src="/medias-lola.jpeg"
            width={900}
            height={1124}
            layout="responsive"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="d-block w-100">
          <Image
            src="/medias-lola.jpeg"
            width={900}
            height={1124}
            layout="responsive"
          />
        </div>
      </Carousel.Item>
    </Carousel>
  </div>
);

export default MobileCarousel;
