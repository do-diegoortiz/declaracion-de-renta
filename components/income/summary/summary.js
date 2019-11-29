import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format'

import css from './summary.scss';

export const Summary = ({ income, workedDays, contract, retention, incomeIndex }) => {
  Summary.propTypes = {
    income: PropTypes.number.isRequired,
    workedDays: PropTypes.number.isRequired,
    contract: PropTypes.string.isRequired,
    retention: PropTypes.number.isRequired,
    incomeIndex: PropTypes.number.isRequired
  };

  let totalSalary = 0
  let health = 0
  let retirement = 0
  let solidarity = 0
  let perks = 0
  let totalIncome = 0

  switch(contract) {
    case 'nomina':
      totalSalary = (income / 30) * workedDays;
      health = totalSalary * 0.04
      retirement = health
      solidarity = income > (828116 * 4) ? totalSalary * 0.01 : 0
      perks = totalSalary / 12
      // I won't substract retention here (pending)
      totalIncome = totalSalary - health - retirement - solidarity + perks * 2.5
      break;

    case 'prestaciones':
      totalSalary = (income / 30) * workedDays;
      health = totalSalary * 0.4 * 0.16
      retirement = totalSalary * 0.4 * 0.125
      solidarity = totalSalary * 0.4 * 0.01
      perks = 0
      // I won't substract retention here (pending)
      totalIncome = totalSalary - health - retirement - solidarity
      break;

    case 'contratista':
      totalSalary = (income / 30) * workedDays;
      health = totalSalary * 0.4 * 0.16 // This information should be used to guess the deductions
      retirement = totalSalary * 0.4 * 0.125 // This information should be used to guess the deductions
      totalIncome = totalSalary
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
        prefix='$'
        decimalScale={0}
      />
    </p>
    <p className={css.Detail}>
      Pensiones: &nbsp;
      <NumberFormat
        value={retirement}
        thousandSeparator={true}
        prefix='$'
        decimalScale={0}
      />
    </p>
    <p className={css.Detail}>
      Solidaridad: &nbsp;
      <NumberFormat
        value={solidarity}
        thousandSeparator={true}
        prefix='$'
        decimalScale={0}
      />
    </p>
    <p className={css.Detail}>
      Rte.Fte. Estimada: &nbsp;
      <NumberFormat
        value={retention}
        thousandSeparator={true}
        prefix='$'
        decimalScale={0}
      />
    </p>

    <p className={css.Detail}>
      Vacaciones: &nbsp;
      <NumberFormat
        value={perks/2}
        thousandSeparator={true}
        prefix='$'
        decimalScale={0}
      />
    </p>
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
        value={perks}
        thousandSeparator={true}
        prefix='$'
        decimalScale={0}
      />
    </p>
  </ div>
}

export default Summary
