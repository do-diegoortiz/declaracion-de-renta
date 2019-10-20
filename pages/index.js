import React from 'react'
import Head from 'next/head'
import Income from '../components/income/income'

import css from './index.scss'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title>Inicio</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <h1 className={css.title}>Optimiza la declaración de renta</h1>
        <p className={css.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <h2 className={css.formTitle}>
          Ingresos
        </h2>

        <Income />

        <h2 className={css.formTitle}>
          Deducciones
        </h2>

        <div className={css.cover}>
          <form className={css.formContainer}>
            <label htmlFor='de'>De</label>
            <input type='date' name='de' />

            <label htmlFor='hasta'>Hasta</label>
            <input type='date' name='hasta' value='2019-12-31' />

            <input type='submit' value='Calcular' />
          </form>
        </div>
      </div>
    )
  }
}

export default Home
