import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format'

import css from './totalSummary.scss';

export const TotalSummary = ({ income, incomeOutOfTaxes }) => {
  TotalSummary.propTypes = {
    income: PropTypes.number.isRequired,
    incomeOutOfTaxes: PropTypes.number.isRequired,
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
          value={incomeOutOfTaxes}
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
          value={income - incomeOutOfTaxes}
          thousandSeparator={true}
          prefix='$'
          decimalScale='0'
        />
      </span>
    </h2>
  </ div>
}

export default TotalSummary
