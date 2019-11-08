import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format'

import css from './summary.scss';

export const Summary = ({ income, totalDays, contract, incomeIndex }) => {
  Summary.propTypes = {
    income: PropTypes.array.isRequired,
    totalDays: PropTypes.number.isRequired,
    contract: PropTypes.string.isRequired,
    incomeIndex: PropTypes.number.isRequired
  };

  let totalSalary = 0
  let health = 0
  let retirement = 0
  let solidarity = 0
  let retention = 0
  let perks = 0
  let totalIncome = 0

  switch(contract) {
    case 'nomina':
      totalSalary = (income / 30) * totalDays;
      health = totalSalary * 0.04
      retirement = health
      solidarity = income > (828116 * 4) ? totalSalary * 0.01 : 0
      retention = income > 4770183 ? (totalSalary - (4770183 * totalDays/30)) * 0.19 : 0
      perks = income * (totalDays/365)
      totalIncome = totalSalary - health - retirement - solidarity - retention + perks * 2.5
      break;

    case 'prestaciones':
      totalSalary = (income / 30) * totalDays;
      health = totalSalary * 0.4 * 0.16
      retirement = totalSalary * 0.4 * 0.125
      solidarity = totalSalary * 0.01
      retention = totalSalary * 0.1
      perks = 0
      totalIncome = totalSalary - health - retirement - solidarity - retention
      break;

    case 'contratista':
      totalSalary = (income / 30) * totalDays;
      health = totalSalary * 0.4 * 0.16
      retirement = totalSalary * 0.4 * 0.125
      solidarity = 0
      retention = 0
      perks = 0
      totalIncome = totalSalary - health - retirement
      break;
  }

  return <div className={css.SummaryContainer}>
    <h2 key={income}>
      Ingresos totales trabajo # {incomeIndex + 1}:
      <p className={css.TotalNumber}>
        <NumberFormat
          value={totalIncome}
          thousandSeparator={true}
          prefix='$'
          decimalScale='0'
        />
      </p>
    </h2>
    <h3 className={css.Subtitle}>Desglosados así:</h3>
    <p className={css.PlusDetail}>
      Salario: &nbsp;
      <NumberFormat
        value={totalSalary}
        thousandSeparator={true}
        prefix='$'
        decimalScale='0'
      />
    </p>
    <p className={css.LessDetail}>
      Salud/EPS: &nbsp;
      <NumberFormat
        value={health}
        thousandSeparator={true}
        prefix='$'
        decimalScale='0'
      />
    </p>
    <p className={css.LessDetail}>
      Pensiones: &nbsp;
      <NumberFormat
        value={retirement}
        thousandSeparator={true}
        prefix='$'
        decimalScale='0'
      />
    </p>
    <p className={css.LessDetail}>
      Solidaridad: &nbsp;
      <NumberFormat
        value={solidarity}
        thousandSeparator={true}
        prefix='$'
        decimalScale='0'
      />
    </p>
    <p className={css.LessDetail}>
      Retención: &nbsp;
      <NumberFormat
        value={retention}
        thousandSeparator={true}
        prefix='$'
        decimalScale='0'
      />
    </p>

    <p className={css.PlusDetail}>
      Vacaciones: &nbsp;
      <NumberFormat
        value={perks/2}
        thousandSeparator={true}
        prefix='$'
        decimalScale='0'
      />
    </p>
    <p className={css.PlusDetail}>
      Primas: &nbsp;
      <NumberFormat
        value={perks}
        thousandSeparator={true}
        prefix='$'
        decimalScale='0'
      />
    </p>
    <p className={css.PlusDetail}>
      Cesantias: &nbsp;
      <NumberFormat
        value={perks}
        thousandSeparator={true}
        prefix='$'
        decimalScale='0'
      />
    </p>
  </ div>
}

export default Summary
