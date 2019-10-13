import React from 'react'
import Head from 'next/head'
import css from './index.scss'

const Home = () => (
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

    <div className={css.cover}>
      <form className={css.formContainer}>
        <label className={css.inputIcon} htmlFor='salario'>Contrato</label>
        <select name='' id=''>
          <option value='nomina'>Nomina</option>
          <option value='prestaciones'>Prestacion</option>
        </select>

        <input type='text' placeholder='($) Salario mensual en COP' />

        <label htmlFor='de'>De</label>
        <input type='date' name='de' />

        <label htmlFor='hasta'>Hasta</label>
        <input type='date' name='hasta' value='2019-12-31' />

        <input type='submit' value='Calcular' />
      </form>
    </div>

    <button type='button' className={css.addButton}>
      Agregar +
    </button>

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

export default Home
