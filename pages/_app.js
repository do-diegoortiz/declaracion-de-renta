import App from 'next/app'
import Router from 'next/router'
import Head from 'next/head'
import React from 'react'
import * as gtag from '../lib/gtag'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
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
