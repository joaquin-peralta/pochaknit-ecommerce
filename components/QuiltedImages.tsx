import Image from 'next/image';
import { getStrapiMedia } from '@utils/strapi';
import styles from '@styles/components/QuiltedImages.module.scss';

type Props = {
  images: any;
};

const QuiltedImages = ({ images }: Props) => (
  <>
    <div className={styles.wrapper}>
      <div className={styles.one}>
        <Image src={getStrapiMedia(images[0])} width={900} height={1200} layout="responsive" />
      </div>
      <div className={styles.two}>
        <Image src={getStrapiMedia(images[1])} width={900} height={1200} layout="responsive" />
      </div>
      <div className={styles.three}>
        <Image src={getStrapiMedia(images[2])} width={900} height={1200} layout="responsive" />
      </div>
    </div>
  </>
);

export default QuiltedImages;
