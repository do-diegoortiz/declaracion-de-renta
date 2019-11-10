import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format'

import css from './totalSummary.scss';

export const TotalSummary = ({ income, incomeWithoutTaxes }) => {
  TotalSummary.propTypes = {
    income: PropTypes.number.isRequired,
    incomeWithoutTaxes: PropTypes.number.isRequired,
  };

  return <div className={css.SummaryContainer} key={income}>
    <h2>
      Ingresos Totales 2019:
      <span className={css.TotalBadNumber}>
        <NumberFormat
          value={income}
          thousandSeparator={true}
          prefix='$'
          decimalScale='0'
        />
      </span>
    </h2>
    <h2>
      Ingresos no constitutivos de renta:
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
      Renta liquida:
      <span className={css.TotalBadNumber}>
        <NumberFormat
          value={income - incomeWithoutTaxes}
          thousandSeparator={true}
          prefix='$'
          decimalScale='0'
        />
      </span>
    </h2>
  </ div>
}

export default TotalSummary
