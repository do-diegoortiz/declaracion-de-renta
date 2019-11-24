import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format'

import css from './outcome.scss';

const UVT = 34270

export const Outcome = ({ liquidIncome, totalDeductions, prepaidMedicine, incomeSources }) => {
  Outcome.propTypes = {
    liquidIncome: PropTypes.number.isRequired,
    totalDeductions: PropTypes.number.isRequired,
    prepaidMedicine: PropTypes.number,
    incomeSources: PropTypes.array
  };

  const totalRetentions = incomeSources.reduce((x, y) => (x + y.retention), 0)

  const retentions = incomeSources.map((income, i) => {
    return income.retention > 0 ? <h2 className={css.SubTotalContainer}>
      <span className={css.Title}>Rte.Fte Trabajo #{i+1}</span>
      <span className={css.TotalNumber}>
        <NumberFormat
          value={income.retention}
          thousandSeparator={true}
          prefix='$'
          decimalScale={0}
        />
      </span>
    </h2> : null
  })

  // If totalDeductions plus 25% of (liquid - totalDeductions) is bigger than top limit 40%, we use 40%
  const liquidIncomeMinusDeductions = (totalDeductions + ((liquidIncome - totalDeductions) * 0.25)) > liquidIncome * 0.4 ? liquidIncome * 0.4 : liquidIncome - totalDeductions - ((liquidIncome - totalDeductions) * 0.25)
  let totalTaxes = 0
  if (liquidIncomeMinusDeductions > (UVT * 4100)) {
    totalTaxes = ((liquidIncomeMinusDeductions - (UVT * 4100)) * 0.33) + (UVT * 788)
  } else if (liquidIncomeMinusDeductions > (UVT * 1700)) {
    totalTaxes = ((liquidIncomeMinusDeductions - (UVT * 1700)) * 0.28) + (UVT * 116)
  } else if (liquidIncomeMinusDeductions > (UVT * 1090)) {
    totalTaxes = ((liquidIncomeMinusDeductions - (UVT * 1090)) * 0.19)
  }

  // Variable to know if I should advice about ways to improve the final payment or not. 38% is pretty close to 40%
  const deductionsOnTheLimit = (totalDeductions + ((liquidIncome - totalDeductions) * 0.25)) > liquidIncome * 0.38

  const savingsForOneMonthOfPrepaidMedicine = calculateSavings(500000)

  // For math, the maximum value to discount in regular deductions is 20% (the other 20% comes from the 25% of 80% [100% - 20%])
  const maxValueToAddInDeductions = (0.2 * liquidIncome) - totalDeductions - totalRetentions
  const savingsWithAdviceInVoluntaryRetirementContributions = calculateSavings(maxValueToAddInDeductions) - totalRetentions

  function calculateSavings(adviceValue) {
    let totalTaxCopy = 0
    let totalTaxCopyWithAdvice = 0
    const liquidIncomeMinusDeductionsCopy = (totalDeductions + ((liquidIncome - totalDeductions) * 0.25)) > liquidIncome * 0.4 ? liquidIncome * 0.6 : liquidIncome - totalDeductions - ((liquidIncome - totalDeductions) * 0.25)
    const liquidIncomeMinusDeductionsCopyWithAdvice = (totalDeductions + adviceValue + ((liquidIncome - totalDeductions) * 0.25)) > liquidIncome * 0.4 ? liquidIncome * 0.6 : liquidIncome - totalDeductions - adviceValue - ((liquidIncome - totalDeductions - adviceValue) * 0.25)

    // when liquidIncomeMinusDeductionsCopyWithAdvice and liquidIncomeMinusDeductionsCopy belong to the same Range, the savings for each $500.000 are 123750 in first validation, 105000 in the second and 71250 in the last group
    if (liquidIncomeMinusDeductionsCopy > (UVT * 4100)) {
      totalTaxCopy = ((liquidIncomeMinusDeductionsCopy - (UVT * 4100)) * 0.33) + (UVT * 788)
    } else if (liquidIncomeMinusDeductionsCopy > (UVT * 1700)) {
      totalTaxCopy = ((liquidIncomeMinusDeductionsCopy - (UVT * 1700)) * 0.28) + (UVT * 116)
    } else if (liquidIncomeMinusDeductionsCopy > (UVT * 1090)) {
      totalTaxCopy = ((liquidIncomeMinusDeductionsCopy - (UVT * 1090)) * 0.19)
    }

    if (liquidIncomeMinusDeductionsCopyWithAdvice > (UVT * 4100)) {
      totalTaxCopyWithAdvice = ((liquidIncomeMinusDeductionsCopyWithAdvice - (UVT * 4100)) * 0.33) + (UVT * 788)
    } else if (liquidIncomeMinusDeductionsCopyWithAdvice > (UVT * 1700)) {
      totalTaxCopyWithAdvice = ((liquidIncomeMinusDeductionsCopyWithAdvice - (UVT * 1700)) * 0.28) + (UVT * 116)
    } else if (liquidIncomeMinusDeductionsCopyWithAdvice > (UVT * 1090)) {
      totalTaxCopyWithAdvice = ((liquidIncomeMinusDeductionsCopyWithAdvice - (UVT * 1090)) * 0.19)
    }
    return totalTaxCopy - totalTaxCopyWithAdvice
  }

  return <div className={css.SummaryContainer} key={liquidIncome}>
    <div className={css.TotalsContainer}>
      <h2 className={css.SubTotalContainer}>
        <span className={css.Title}>Renta Líquida:</span>
        <span className={css.TotalBadNumber}>
          <NumberFormat
            value={liquidIncome}
            thousandSeparator={true}
            prefix='$'
            decimalScale={0}
          />
        </span> 
      </h2>

      <h2 className={css.SubTotalContainer}>
        <span className={css.Title}>Deducciones Totales:</span>
        <span className={css.TotalNumber}>
          <NumberFormat
            value={totalDeductions + (liquidIncome - totalDeductions) * 0.25}
            thousandSeparator={true}
            prefix='$'
            decimalScale={0}
          />
        </span>
      </h2>

      <h2 className={css.SubTotalContainer}>
        {/* Renta liquida menos total de deducciones (Que no deben exeder el 40%) */}
        <span className={css.Title}>Renta Líq. Cedular de Trabajo:</span>
        <span className={css.TotalBadNumber}>
          <NumberFormat
            value={liquidIncomeMinusDeductions}
            thousandSeparator={true}
            prefix='$'
            decimalScale={0}
          />
        </span>
      </h2>

      <h2 className={css.SubTotalContainer}>
        {/* Renta liquida, menos UVT del grupo, por el % del grupo */}
        <span className={css.Title}>Total Impuesto:</span>
        <span className={css.TotalBadNumber}>
          <NumberFormat
            value={totalTaxes}
            thousandSeparator={true}
            prefix='$'
            decimalScale={0}
          />
        </span>
      </h2>

      {retentions}

      <h2 className={css.SubTotalContainer}>
        {/* Renta liquida, menos UVT del grupo, por el % del grupo */}
        <span className={css.Title}>Valor de renta a pagar:</span>
        <span className={css.TotalBadNumber}>
          <NumberFormat
            value={totalTaxes > totalRetentions ? totalTaxes - totalRetentions : 0}
            thousandSeparator={true}
            prefix='$'
            decimalScale={0}
          />
        </span>
      </h2>
    </div>

    <aside className={css.Advice}>
      <h3>Te quedan pocos días del año para optimizar tu pago de renta</h3>
      {
        deductionsOnTheLimit ? <h3> Hiciste un gran trabajo este año. Pagarás lo mínimo posible </h3> :
          <ol>
            <p>Estos son algunos consejos que puedes seguir:</p>
            {prepaidMedicine ? null : <li>Si alcanzas a afiliarte por un mes a medicina prepagada, hazlo. Además de tener mejor servicio de salud, con un plan de $500.000 te ahorrarás <b>${savingsForOneMonthOfPrepaidMedicine}</b> en el pago de renta</li>}
            maxValueToAddInDeductions
            <li>Puedes afiliarte a un fondo de pensiones voluntarias y aportar hasta 
              <span className={css.AdviceValues}>
                <NumberFormat
                  value={maxValueToAddInDeductions}
                  thousandSeparator={true}
                  prefix='$'
                  decimalScale={0}
                />
              </span>
              que dejarían tu valor a pagar de renta en el mínimo posible y te ahorrarias 
              <span className={css.AdviceValues}>
                <NumberFormat
                  value={savingsWithAdviceInVoluntaryRetirementContributions}
                  thousandSeparator={true}
                  prefix='$'
                  decimalScale={0}
                />
              </span>
            </li>
            <li>Diciembre es un buen mes para donar. El valor de renta baja poco (<b>${savingsForOneMonthOfPrepaidMedicine}</b> por cada $500.000 COP), pero al menos te sentirás muy feliz de haber apoyado alguna causa que te parezca importante. Eres parte del 1% mejor remunerado en Colombia y a pesar de que parte de tus impuestos se los lleven los corruptos... es un país en dónde se paga un % bastante bajo de impuestos.</li>
          </ol>
      }
    </aside>
  </ div>
}

export default Outcome
