import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format'

import css from './outcome.scss';

const UVT = 34270

export const Outcome = ({ liquidIncome, totalDeductions }) => {
  Outcome.propTypes = {
    liquidIncome: PropTypes.number.isRequired,
    totalDeductions: PropTypes.number.isRequired,
  };

  // If totalDeductions plus 25% of (liquid - totalDeductions) is bigger than top limit 40%, we use 40%
  const liquidIncomeMinusDeductions = (totalDeductions + ((liquidIncome - totalDeductions) * 0.25)) > liquidIncome * 0.4 ? liquidIncome * 0.4 : liquidIncome - totalDeductions - ((liquidIncome - totalDeductions) * 0.25)
  let totalValueToPay = 0
  if (liquidIncomeMinusDeductions > (UVT * 4100)) {
    totalValueToPay = ((liquidIncomeMinusDeductions - (UVT * 4100)) * 0.33) + (UVT * 788)
  } else if (liquidIncomeMinusDeductions > (UVT * 1700)) {
    totalValueToPay = ((liquidIncomeMinusDeductions - (UVT * 1700)) * 0.28) + (UVT * 116)
  } else if (liquidIncomeMinusDeductions > (UVT * 1090)) {
    totalValueToPay = ((liquidIncomeMinusDeductions - (UVT * 1090)) * 0.19)
  }

  return <div className={css.SummaryContainer} key={liquidIncome}>
    <h2 className={css.TotalContainer}>
      <span className={css.Title}>Renta Líquida:</span>
      <span className={css.TotalBadNumber}>
        <NumberFormat
          value={liquidIncome}
          thousandSeparator={true}
          prefix='$'
          decimalScale='0'
        />
      </span> 
    </h2>
    <h2 className={css.TotalContainer}>
      <span className={css.Title}>Deducciones Totales:</span>
      <span className={css.TotalNumber}>
        <NumberFormat
          value={totalDeductions + (liquidIncome - totalDeductions) * 0.25}
          thousandSeparator={true}
          prefix='$'
          decimalScale='0'
        />
      </span>
    </h2>

    <h2 className={css.TotalContainer}>
      {/* Renta liquida menos total de deducciones (Que no deben exeder el 40%) */}
      <span className={css.Title}>Renta Líquida Cedular de Trabajo:</span>
      <span className={css.TotalBadNumber}>
        <NumberFormat
          value={liquidIncomeMinusDeductions}
          thousandSeparator={true}
          prefix='$'
          decimalScale='0'
        />
      </span>
    </h2>

    <h2 className={css.TotalContainer}>
      {/* Renta liquida, menos UVT del grupo, por el % del grupo */}
      <span className={css.Title}>Valor de renta a pagar:</span>
      <span className={css.TotalBadNumber}>
        <NumberFormat
          value={totalValueToPay}
          thousandSeparator={true}
          prefix='$'
          decimalScale='0'
        />
      </span>
    </h2>
  </ div>
}

export default Outcome
