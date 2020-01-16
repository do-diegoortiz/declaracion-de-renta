import React from 'react'

import css from './introduction.scss'

const Introduction = () => {
  return (
    <div className={css.container}>
      <p className={css.description}>
        Herramienta para saber si debes declarar renta este año por tus ingresos <strong>laborales</strong> de 2019 y el valor estimado a pagar. También te damos algunos consejos para optimizar el pago de este impuesto en años siguientes.
      </p>
      <p className={css.description}>
        Solo debes listar todos tus ingresos laborales a continuación.
      </p>
    </div>
  )
}

export default Introduction
