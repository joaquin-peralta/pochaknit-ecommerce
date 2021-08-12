/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-danger */
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { FB_PIXEL_ID } from '@utils/fpixel';

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
          <meta name="facebook-domain-verification" content="zanvl141j8vp2wteb5ht3yeeyiq4wr" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${FB_PIXEL_ID});
            `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView
&noscript=1`}
            />
          </noscript>
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
