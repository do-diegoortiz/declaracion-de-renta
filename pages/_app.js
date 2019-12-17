import App from 'next/app'
import Router from 'next/router'
import Head from 'next/head'
import React from 'react'
import withReduxStore from '../lib/redux'
import { Provider } from 'react-redux'
import * as gtag from '../lib/gtag'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <>
        <Head>
          <title>Declaracion de Renta</title>
        </Head>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </>
    )
  }
}

export default withReduxStore(MyApp)
