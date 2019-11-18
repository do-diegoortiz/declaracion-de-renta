import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format'

import css from './outcome.scss';

export const Outcome = ({ liquidIncome, incomeWithoutTaxes }) => {
  Outcome.propTypes = {
    liquidIncome: PropTypes.number.isRequired,
    incomeWithoutTaxes: PropTypes.number.isRequired,
  };

  return <div className={css.SummaryContainer} key={liquidIncome}>
    <h2>
      Renta Líquida:
      <span className={css.TotalBadNumber}>
        <NumberFormat
          value={liquidIncome}
          thousandSeparator={true}
          prefix='$'
          decimalScale='0'
        />
      </span>
    </h2>
    <h2>
      Deducciones Totales:
      <span className={css.TotalNumber}>
        <NumberFormat
          value={incomeWithoutTaxes}
          thousandSeparator={true}
          prefix='$'
          decimalScale='0'
        />
      </span>
    </h2>

    <h2>
      {/* Renta liquida menos total de deducciones (Que no deben exeder el 40%) */}
      Renta Líquida Cedular de Trabajo:
      <span className={css.TotalBadNumber}>
        <NumberFormat
          value={liquidIncome - (liquidIncome * 0.25)}
          thousandSeparator={true}
          prefix='$'
          decimalScale='0'
        />
      </span>
    </h2>

    <h2>
      {/* Renta liquida, menos UVT del grupo, por el % del grupo */}
      Valor de renta a pagar:
      <span className={css.TotalBadNumber}>
        <NumberFormat
          value={(liquidIncome - (liquidIncome * 0.25)) * 0.28}
          thousandSeparator={true}
          prefix='$'
          decimalScale='0'
        />
      </span>
    </h2>
  </ div>
}

export default Outcome
