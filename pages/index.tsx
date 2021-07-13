import { Pattern } from '@types';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import FeaturedPattern from '@components/FeaturedPattern';
import { getStrapiUrl } from '@utils/strapi';
import GlobalStyles from '@styles/GlobalStyles';

type Featured = {
  _id: string;
  pattern: Pattern;
};

export const getStaticProps = async () => {
  const res = await fetch(getStrapiUrl('/featured-patterns'));
  const featured: Featured[] = await res.json();

  return {
    props: {
      featured,
    },
  };
};

const Home = ({ featured }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <Head>
      <title>Pocha Knit</title>
    </Head>
    {featured.map((item, index) => (
      <Link key={item._id} href={`/patterns/${item.pattern._id}`}>
        <a className="text-decoration-none text-reset">
          <FeaturedPattern pattern={item.pattern} indexOfArray={index} />
        </a>
      </Link>
    ))}
    <GlobalStyles />
  </>
);

export default Home;
