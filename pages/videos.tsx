import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import YouTube from 'react-youtube';
import { getStrapiUrl } from '@utils/strapi';
import styles from '@styles/pages/Videos.module.scss';

export const getStaticProps = async () => {
  const res = await fetch(getStrapiUrl('/videos'));
  const videos = await res.json();

  return {
    props: {
      videos,
    },
  };
};

type Props = {
  videos: any;
};

const VideosPage = ({ videos }: Props) => (
  <>
    <Head>
      <title>Videos - Pocha Knit</title>
    </Head>
    <Container>
      <ul className="list-unstyled text-center py-3">
        {videos.videos.map((video) => (
          <li key={video.id}>
            <h3 style={{ fontWeight: 'lighter' }}>{video.title}</h3>
            <YouTube videoId={video.id} containerClassName={styles.youtubeContainer} />
          </li>
        ))}
      </ul>
    </Container>
  </>
);

export default VideosPage;
