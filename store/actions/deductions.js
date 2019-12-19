import * as actions from './actionTypes'
import * as actionCreators from './index';

export const getNotLayoffDeductions = (deductions) => {
  return deductions.prepaidMedicine
  + deductions.indepSocialSecurity
  + deductions.dependantsDeduction
  + deductions.donations
  + deductions.voluntaryContributions
}

export const updateTotalLayoffsValue = data => {
  return {
    type: actions.UPDATE_TOTAL_LAYOFFS_VALUE,
    data: data
  }
}

export const updateTotalDeductions = data => {
  return {
    type: actions.UPDATE_TOTAL_DEDUCTIONS,
    data: data
  }
}

export const handleDeductionChange = (e, newValue) => {
  return (dispatch, getState) => {
    let totalDeductions = 0
    const incomeSources = getState().income.incomeSources
    const deductions = getState().deduction
    const totalIncome = incomeSources.map((x, i) => x.income * actionCreators.getMonthsWorked(incomeSources[i])).reduce((acum, current)=> acum + current)

    const incomeOutOfTaxes = getState().income.incomeOutOfTaxes
    const liquidIncome = totalIncome - incomeOutOfTaxes

    if (e.target.name === 'dependants') {
      totalDeductions = getTotalDeductionsDependants(e.target.value * totalIncome * 0.1, deductions)      
      const deductionsOverTheLimit = totalDeductions + ((liquidIncome - totalDeductions) * 0.25) > (liquidIncome * 0.4)

      if (deductionsOverTheLimit) {
        alert("Lo sentimos, las deducciones no pueden exceder el 40% del ingreso liquido")
      } else {
        // Theory says you can substract 10% of your income for every dependant
        dispatch(updateDependantsDeduction(e.target.value * totalIncome * 0.1))
        dispatch(updateDependantsValue(e.target.value))
        dispatch(updateTotalDeductions(totalDeductions))
      }
    } else {
      totalDeductions = getTotalDeductionsStandard(e.target.name, parseInt(newValue), deductions)
      const deductionsOverTheLimit = totalDeductions + ((liquidIncome - totalDeductions) * 0.25) > (liquidIncome * 0.4)

      if (deductionsOverTheLimit) {
        alert("Lo sentimos, las deducciones no pueden exceder el 40% del ingreso liquido")
        dispatch(updateDeductionValue(e.target.name, deductions[e.target.name]))
      } else {
        dispatch(updateDeductionValue(e.target.name, parseInt(newValue)))
        dispatch(updateTotalDeductions(totalDeductions))
      }
    }
  }
}

const getTotalDeductionsDependants = (value, deductions) => {
  return deductions.totalLayoffs
    + deductions.prepaidMedicine
    + deductions.indepSocialSecurity
    + value
    + deductions.donations
    + deductions.voluntaryContributions
}

const updateDependantsDeduction = data => {
  return {
    type: actions.UPDATE_DEPENDANTS_DEDUCTION,
    data: data
  }
}

const updateDependantsValue = data => {
  return {
    type: actions.UPDATE_DEPENDANTS_VALUE,
    data: data
  }
}

const getTotalDeductionsStandard = (deduction, value, deductionsValue) => {
  const deductions = ['totalLayoffs', 'prepaidMedicine', 'indepSocialSecurity', 'homeLoanInteres', 'donations', 'voluntaryContributions']
  let newTotal = deductionsValue.dependantsDeduction

  deductions.forEach(item => {
    if (deduction === item){
      newTotal += (value || 0)
    } else {
      newTotal += deductionsValue[item]
    }
  })

  return newTotal
}

const updateDeductionValue = (name, value) => {
  return {
    type: actions.UPDATE_DEDUCTION_VALUE,
    data: {name, value}
  }
}

export const handleRetentionChange = (newRetention, index) => {
  return (dispatch, getState) => {
    if (newRetention) {
      const newValue = parseInt(newRetention)
      const sourcesCopy = getState().income.incomeSources
      sourcesCopy[index].retention = newValue

      dispatch(actionCreators.updateIncomeSources(sourcesCopy))
    }
  }
}

export const handleLayoffChange = (e, newValue) => {
  e.preventDefault()
  return (dispatch) => {
    dispatch(actionCreators.updateLayoffsLastYear(parseInt(newValue)))
    dispatch(actionCreators.updateTotalIncome(parseInt(newValue)))
  }
}
