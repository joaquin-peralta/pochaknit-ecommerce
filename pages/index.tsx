import Head from 'next/head';
import GlobalStyles from '@styles/GlobalStyles';
import FeaturedPattern from '@components/FeaturedPattern/FeaturedPattern';

interface Props {
  featuredPatterns: Array<object>;
}

export default function Home({ featuredPatterns }: Props) {
  // console.log(featuredPatterns[0].pattern.type);
  console.log(featuredPatterns[0].id);
  // console.log(featuredPatterns[0].pattern.images[0].url);
  // console.log(typeof featuredPatterns[0]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {featuredPatterns.map((obj, index) => (
        <FeaturedPattern
          key={obj.id}
          category={obj.pattern.category}
          name={obj.pattern.name}
          img="http://localhost:1337/uploads/medias_lola_4988cd310d.jpeg"
          indexOfArray={index + 1}
          titleColor="blue"
        />
      ))}

      <GlobalStyles />
    </>
  );
}

export async function getStaticProps() {
  const featuredPatterns = await fetch(
    'http://localhost:1337/featured-patterns',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((response) => response.json());

  return {
    props: {
      featuredPatterns,
    },
  };
}
