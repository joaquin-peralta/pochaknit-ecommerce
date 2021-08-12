import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import FeaturedPattern from '@components/FeaturedPattern';
import { getStrapiUrl } from '@utils/strapi';
import { Pattern } from '@types';

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(getStrapiUrl('/patterns?is_featured=true&_sort=published_date:DESC'));
  const patterns = await res.json();

  return {
    props: {
      patterns,
    },
  };
};

type Props = {
  patterns: Pattern[];
};

function Home({ patterns }: Props) {
  return (
    <>
      <Head>
        <title>Pocha Knit</title>
      </Head>

      {patterns.map((item, index) => (
        <Link key={item._id} href={`/patterns/${item._id}`}>
          <a className="text-decoration-none text-reset">
            <FeaturedPattern pattern={item} index={index} />
          </a>
        </Link>
      ))}
    </>
  );
}

export default Home;
