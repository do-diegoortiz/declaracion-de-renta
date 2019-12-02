import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import ReactGA from 'react-ga'

export default class MyApp extends App {
  componentDidMount() {
    // client-side only, run once on mount
    ReactGA.initialize('UA-46283734-12')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (typeof(window) === "object") {
      ReactGA.pageview(ctx.asPath)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Declaracion de Renta</title>
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
}
