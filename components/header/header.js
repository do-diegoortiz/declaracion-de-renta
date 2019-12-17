import React from 'react'

import css from './header.scss'

const Header = () => {
  return (
    <>
      <h1 className={css.title}>Optimiza la declaración de renta</h1>
      <p className={css.description}>
        Hay algunas cosas que puedes hacer, antes del 31 de diciembre de 2019, para reducir legalmente el impuesto a pagar por ingresos de trabajo del 2019.
      </p>
      <p className={css.description}>
        De momento, aquí podrás saber si debes declarar renta el próximo año y algunos consejos para optimizar el pago de este impuesto.
      </p>
    </>
  )
}

export default Header
