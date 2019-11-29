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
      <span className={css.Title}> No constitutivos de renta:</span>
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
  </ div>
}

export default TotalSummary
