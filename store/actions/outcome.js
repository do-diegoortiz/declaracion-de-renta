import * as actions from './actionTypes'

const UVT = 34270

export const totalRetentions = () => {
  return (dispatch, getState) => {
    const incomeSources = getState().income.incomeSources
    const totalRetentions = incomeSources.reduce((x, y) => (x + y.retention), 0)

    dispatch(updateTotalRetentions(totalRetentions))
  }
}

const updateTotalRetentions = data => {
  return {
    type: actions.UPDATE_TOTAL_RETENTIONS,
    data: data
  }
}

// If totalDeductions plus 25% of (liquid - totalDeductions) is bigger than top limit 40%, we use 40%
export const liquidIncomeMinusDeductions = () => {
  return (dispatch, getState) => {
    const totalDeductions = getState().deduction.totalDeductions
    const totalIncome = getState().income.totalIncome
    const incomeOutOfTaxes  = getState().income.incomeOutOfTaxes
    let liquidIncome = totalIncome - incomeOutOfTaxes
    
    if ((totalDeductions + ((liquidIncome - totalDeductions) * 0.25)) > liquidIncome * 0.4) {
      const liquidIncomeMinusDeductions = liquidIncome * 0.4
      dispatch(updateLiquidIncomeMinusDeductions(liquidIncomeMinusDeductions))
    } else {
      const liquidIncomeMinusDeductions = liquidIncome - totalDeductions - ((liquidIncome - totalDeductions) * 0.25)
      dispatch(updateLiquidIncomeMinusDeductions(liquidIncomeMinusDeductions))
    }
  }
}

const updateLiquidIncomeMinusDeductions = data => {
  return {
    type: actions.UPDATE_LIQUID_INCOME_MINUS_DEDUCTIONS,
    data: data
  }
}

export const totalTaxes = () => {
  return (dispatch, getState) => {
    const liquidIncomeMinusDeductions = getState().outcome.liquidIncomeMinusDeductions
    let totalTaxes = 0

    if (liquidIncomeMinusDeductions > (UVT * 4100)) {
      totalTaxes = ((liquidIncomeMinusDeductions - (UVT * 4100)) * 0.33) + (UVT * 788)
    } else if (liquidIncomeMinusDeductions > (UVT * 1700)) {
      totalTaxes = ((liquidIncomeMinusDeductions - (UVT * 1700)) * 0.28) + (UVT * 116)
    } else if (liquidIncomeMinusDeductions > (UVT * 1090)) {
      totalTaxes = ((liquidIncomeMinusDeductions - (UVT * 1090)) * 0.19)
    }

    dispatch(updateTotalTaxes(totalTaxes))
  }
}

const updateTotalTaxes = data => {
  return {
    type: actions.UPDATE_TOTAL_TAXES,
    data: data
  }
}

// Variable to know if I should advice about ways to improve the final payment or not. 38% is pretty close to 40%
export const deductionsOnTheLimit = () => {
  return (dispatch, getState) => {
    const totalDeductions = getState().deduction.totalDeductions
    const totalIncome = getState().income.totalIncome
    const incomeOutOfTaxes  = getState().income.incomeOutOfTaxes
    let liquidIncome = totalIncome - incomeOutOfTaxes

    const deductionsOnTheLimit = (totalDeductions + ((liquidIncome - totalDeductions) * 0.25)) > liquidIncome * 0.38
    dispatch(updateDeductionsOnTheLimit(deductionsOnTheLimit))
  }
}

const updateDeductionsOnTheLimit = (data) => {
  return {
    type: actions.UPDATE_DEDUCTIONS_ON_THE_LIMIT,
    data: data
  }
}

export const maxValueToAddInDeductions = () => {
  return (dispatch, getState) => {
    const totalRetentions = getState().outcome.totalRetentions
    const totalDeductions = getState().deduction.totalDeductions
    const totalIncome = getState().income.totalIncome
    const incomeOutOfTaxes  = getState().income.incomeOutOfTaxes
    let liquidIncome = totalIncome - incomeOutOfTaxes

    const savingsForOneMonthOfPrepaidMedicine = dispatch(calculateSavings(500000))
    const incomeAlreadyPaidInRetentions = 500000 * totalRetentions / savingsForOneMonthOfPrepaidMedicine
    // For math, the maximum value to discount in regular deductions is 20% (the other 20% comes from the 25% of 80% [100% - 20%])
    const maxValueToAddInDeductions = (0.2 * liquidIncome) - totalDeductions - incomeAlreadyPaidInRetentions
    dispatch(updateSavingsForOneMonthOfPrepaidMedicine(savingsForOneMonthOfPrepaidMedicine))
    dispatch(updateMaxValueToAddInDeductions(maxValueToAddInDeductions))
  }
}

const updateSavingsForOneMonthOfPrepaidMedicine = data => {
  return {
    type: actions.UPDATE_SAVINGS_FOR_ONE_MONTH_OF_PREPAID_MEDICINE,
    data: data
  }
}

const updateMaxValueToAddInDeductions = data => {
  return {
    type: actions.UPDATE_MAX_VALUE_TO_ADD_IN_DEDUCTIONS,
    data: data
  }
}

export const savingsWithAdviceInVoluntaryRetirementContributions = () => {
  return (dispatch, getState) => {
    let maxValueToAddInDeductions = getState().outcome.maxValueToAddInDeductions
    dispatch(updateSavingsWithAdviceInVoluntaryRetirementContributions(dispatch(calculateSavings(maxValueToAddInDeductions))))
  }
}

const updateSavingsWithAdviceInVoluntaryRetirementContributions = data => {
  return {
    type: actions.UPDATE_SAVINGS_WITH_ADVICE_IN_VOLUNTARY_RETIREMENT_CONTRIBUTIONS,
    data: data
  }
}

const calculateSavings = adviceValue => {
  return (dispatch, getState) => {
    let totalTaxCopy = 0
    let totalTaxCopyWithAdvice = 0
    const totalDeductions = getState().deduction.totalDeductions
    const totalIncome = getState().income.totalIncome
    const incomeOutOfTaxes  = getState().income.incomeOutOfTaxes
    let liquidIncome = totalIncome - incomeOutOfTaxes

    const liquidIncomeMinusDeductionsCopy = (totalDeductions + ((liquidIncome - totalDeductions) * 0.25)) > liquidIncome * 0.4 ? liquidIncome * 0.6 : liquidIncome - totalDeductions - ((liquidIncome - totalDeductions) * 0.25)

    const liquidIncomeMinusDeductionsCopyWithAdvice = (totalDeductions + adviceValue + ((liquidIncome - totalDeductions - adviceValue) * 0.25)) > liquidIncome * 0.4 ? liquidIncome * 0.6 : liquidIncome - totalDeductions - adviceValue - ((liquidIncome - totalDeductions - adviceValue) * 0.25)
    
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
}
