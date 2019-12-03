import React from 'react';
import moment from 'moment'
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format'

import css from './summary.scss';

export const Summary = ({ income, workedDays, contract, retention, toDate, incomeIndex }) => {
  Summary.propTypes = {
    income: PropTypes.number.isRequired,
    workedDays: PropTypes.number.isRequired,
    contract: PropTypes.string.isRequired,
    retention: PropTypes.number.isRequired,
    toDate: PropTypes.instanceOf(moment).isRequired,
    incomeIndex: PropTypes.number.isRequired
  };

  // This days/months calculations must be improved to match the legal norm
  // TODO: Check properly bug 364 days. After assigning a different endDate and then Dec 31th again
  let totalSalary = workedDays === 365 || workedDays === 364 ? income * 12 : (income / 30) * workedDays;
  let health = totalSalary * 0.4 * 0.16 // This information should be used to guess the deductions
  let retirement = totalSalary * 0.4 * 0.125 // This information should be used to guess the deductions
  let solidarity = 0
  let perks = 0
  let layoffs = 0
  let totalIncome = totalSalary // Default value for 'contratista'

  switch(contract) {
    case 'nomina':
      health = totalSalary * 0.04
      retirement = health
      solidarity = income > (828116 * 4) ? totalSalary * 0.01 : 0
      perks = totalSalary / 12
      layoffs = (toDate._d.getDate() === 31 && toDate._d.getMonth() === 11) ? 0 : perks
      // I won't substract retention here (pending)
      totalIncome = totalSalary + perks + layoffs
      break;

    case 'prestaciones':
      solidarity = totalSalary * 0.4 * 0.01
      // I won't substract retention here (pending)
      totalIncome = totalSalary - health - retirement - solidarity
      break;

    case 'contratista':
      // Check if we can delete this case
      break;
  }

  return <div className={css.SummaryContainer} key={income}>
    <h2>
      Ingresos brutos de trabajo # {incomeIndex + 1}:
      <p className={css.TotalNumber}>
        <NumberFormat
          value={totalIncome}
          thousandSeparator={true}
          prefix='$'
          decimalScale={0}
        />
      </p>
    </h2>
    <h3 className={css.Subtitle}>Desglosados así:</h3>
    <p className={css.Detail}>
      Salario: &nbsp;
      <NumberFormat
        value={totalSalary}
        thousandSeparator={true}
        prefix='$'
        decimalScale={0}
      />
    </p>
    <p className={css.Detail}>
      Salud/EPS: &nbsp;
      <NumberFormat
        value={health}
        thousandSeparator={true}
        prefix='- $'
        decimalScale={0}
      />
    </p>
    <p className={css.Detail}>
      Pensiones: &nbsp;
      <NumberFormat
        value={retirement}
        thousandSeparator={true}
        prefix='- $'
        decimalScale={0}
      />
    </p>
    <p className={css.Detail}>
      Solidaridad: &nbsp;
      <NumberFormat
        value={solidarity}
        thousandSeparator={true}
        prefix='- $'
        decimalScale={0}
      />
    </p>
    <p className={css.Detail}>
      Rte.Fte. Estimada: &nbsp;
      <NumberFormat
        value={retention}
        thousandSeparator={true}
        prefix='- $'
        decimalScale={0}
      />
    </p>

    {/* <p className={css.Detail}>
      Vacaciones: &nbsp;
      <NumberFormat
        value={perks/2}
        thousandSeparator={true}
        prefix='$'
        decimalScale={0}
      />
    </p> */}
    <p className={css.Detail}>
      Primas: &nbsp;
      <NumberFormat
        value={perks}
        thousandSeparator={true}
        prefix='$'
        decimalScale={0}
      />
    </p>
    <p className={css.Detail}>
      Cesantias: &nbsp;
      <NumberFormat
        value={layoffs}
        thousandSeparator={true}
        prefix='$'
        decimalScale={0}
      />
    </p>
  </ div>
}

export default Summary
