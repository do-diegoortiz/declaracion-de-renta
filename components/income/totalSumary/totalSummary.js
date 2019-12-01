import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format'

import { BlueButton } from '../../buttons/buttons'
import css from './totalSummary.scss';

export const TotalSummary = ({ income, incomeOutOfTaxes, hasToDeclare, showDeductions }) => {
  TotalSummary.propTypes = {
    income: PropTypes.number.isRequired,
    incomeOutOfTaxes: PropTypes.number.isRequired,
    hasToDeclare: PropTypes.bool.isRequired,
    showDeductions: PropTypes.func.isRequired
  };

  return <div className={css.Container}>
    <div className={css.SummaryContainer} key={income}>
      <h2 className={css.TotalContainer}>
        <span className={css.Title}> Ingresos 2019:</span>
        <span className={css.TotalNumber}>
          <NumberFormat
            value={income}
            thousandSeparator={true}
            prefix='$'
            decimalScale={0}
          />
        </span>
      </h2>
      <h2 className={css.TotalContainer}>
        <span className={css.Title}> 
          {window.innerWidth > 400 ? 'Ingresos no constitutivos' : 'Fuera'} de renta:
        </span>
        <span className={css.TotalNumber}>
          <NumberFormat
            value={incomeOutOfTaxes}
            thousandSeparator={true}
            prefix='$ - '
            decimalScale={0}
          />
        </span>
      </h2>

      <h2 className={css.TotalContainer}>
        <span className={css.Title}> Renta liquida:</span>
        <span className={css.TotalNumber}>
          <NumberFormat
            value={income - incomeOutOfTaxes}
            thousandSeparator={true}
            prefix='$'
            decimalScale={0}
          />
        </span>
      </h2>

      { hasToDeclare && <BlueButton label='Ver valor a pagar y cómo reducirlo' onClick={showDeductions} width='24rem' minHeight='3rem' fontSize='1.2rem'/> }
    </ div>
    <ul>
      <li>Los ingresos no constitutivos de renta son los aportes a salud, pensión y solidaridad. En nómina son del 8% de su base salarial, como independiente es el 28.5% del 40% de tu salario.</li>
      <li>La retención en la fuente es estimada, puede variar un poco dependiendo de varias cosas.</li>
      <li>Suponemos que usaste las vacaciones a las que tienes derecho, entonces ese concepto no lo sumamos al ingreso bruto</li>
      <li>Si vas a continuar en el mismo trabajo, las cesantias son ingresos que van a consignar hasta febrero del siguiente año, solo las sumamos cuando renunciaste al trabajo antes de Diciembre 31 o se terminó el contrato y te liquidaron</li>
    </ul>
  </div>
    
}

export default TotalSummary
