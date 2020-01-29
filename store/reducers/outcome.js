import * as actions from '../actions/actionTypes';

const initialState = {
  totalRetentions: 0,
  liquidIncomeMinusDeductions: 0,
  totalTaxes: 0,
  deductionsOnTheLimit: 0,
  savingsForOneMonthOfPrepaidMedicine: 0,
  maxValueToAddInDeductions: 0,
  savingsWithAdviceInVoluntaryRetirementContributions: 0
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.UPDATE_TOTAL_RETENTIONS: return updateTotalRetentions(state, action)
    case actions.UPDATE_LIQUID_INCOME_MINUS_DEDUCTIONS: return updateLiquidIncomeMinusDeductions(state, action)
    case actions.UPDATE_TOTAL_TAXES: return updateTotalTaxes(state, action)
    case actions.UPDATE_DEDUCTIONS_ON_THE_LIMIT: return updateDeductionsOnTheLimit(state, action)
    case actions.UPDATE_SAVINGS_FOR_ONE_MONTH_OF_PREPAID_MEDICINE: return updateSavingsForOneMonthOfPrepaidMedicine(state, action)
    case actions.UPDATE_MAX_VALUE_TO_ADD_IN_DEDUCTIONS: return updateMaxValueToAddInDeductions(state, action)
    case actions.UPDATE_SAVINGS_WITH_ADVICE_IN_VOLUNTARY_RETIREMENT_CONTRIBUTIONS: return updateSavingsWithAdviceInVoluntaryRetirementContributions(state, action)
    default: return state
  }
}

const updateTotalRetentions = (state, action) => {
  return {
    ...state,
    totalRetentions: action.data
  }
}

const updateLiquidIncomeMinusDeductions = (state, action) => {
  return {
    ...state,
    liquidIncomeMinusDeductions: action.data
  }
}

const updateTotalTaxes = (state, action) => {
  return {
    ...state,
    totalTaxes: action.data
  }
}

const updateDeductionsOnTheLimit = (state, action) => {
  return {
    ...state,
    deductionsOnTheLimit: action.data
  }
}

const updateSavingsForOneMonthOfPrepaidMedicine = (state, action) => {
  return {
    ...state,
    savingsForOneMonthOfPrepaidMedicine: action.data
  }
}

const updateMaxValueToAddInDeductions = (state, action) => {
  return {
    ...state,
    maxValueToAddInDeductions: action.data
  }
}

const updateSavingsWithAdviceInVoluntaryRetirementContributions = (state, action) => {
  return {
    ...state,
    savingsWithAdviceInVoluntaryRetirementContributions: action.data
  }
}

export default reducer
