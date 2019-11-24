// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          <title>Inicio</title>
          <link rel='icon' href='/favicon.ico' />
          <meta name="description" content="Optimiza tu declaración de renta para que no se te vaya un ojo de la cara en agosto del próximo año"></meta>
          <meta name="keywords" content="Declaración de renta, pensiones voluntarias, retención en la fuente"></meta>
          <link rel="apple-touch-icon" href="/public/images/android-chrome-192x192.png"/>
          <link rel="icon" sizes="192x192" href="/public/images/android-chrome-192x192.png"/>
          <link rel="manifest" href="/public/manifest.json"/>
          <link rel="shortcut icon" href="/public/images/favicon.ico"/>
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