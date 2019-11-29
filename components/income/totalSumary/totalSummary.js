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

  return <div className={css.SummaryContainer} key={income}>
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
}

export default TotalSummary
