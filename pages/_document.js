// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../lib/gtag'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          <link rel='icon' href='/favicon.ico' />
          <meta name="description" content="Optimiza tu declaración de renta para que no se te vaya un ojo de la cara en agosto del próximo año"></meta>
          <meta name="keywords" content="Declaración de renta, pensiones voluntarias, retención en la fuente"></meta>
          <meta name="theme-color" content="#673ab7"></meta>
          <link rel="apple-touch-icon" href="/images/android-chrome-192x192.png"/>
          <link rel="icon" sizes="192x192" href="/images/android-chrome-192x192.png"/>
          <link rel="manifest" href="/manifest.json"/>
          <link rel="shortcut icon" href="/images/favicon.ico"/>
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Comfortaa:300,400&display=swap" rel="stylesheet" />

          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument