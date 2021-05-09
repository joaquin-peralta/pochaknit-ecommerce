import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          <meta name="title" content="Pocha Knit | Patrones de tejidos y más..." />
          <meta
            name="description"
            content="Patrones de tejidos para agujas circulares y agujas rectas. Videos de técnicas de tejidos."
          />
          <meta name="keywords" content="patrón, tejidos, agujas circulares, agujas rectas" />
          <meta name="robots" content="index, follow" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Thasadith:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Pocha Knit | Patrones de tejidos y más..." />
          <meta
            property="og:description"
            content="Patrones de tejidos para agujas circulares y agujas rectas. Videos de técnicas de tejidos."
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/dcjnbvln1/image/upload/v1620592634/pochaknit-lightblue-brand_wizsng.jpg"
          />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="800" />
          <meta property="og:url" content="https://pochaknit.com" />
          <meta property="og:site_name" content="Pocha Knit" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
