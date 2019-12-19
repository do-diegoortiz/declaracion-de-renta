import * as actions from '../actions/actionTypes'

const initialState = {
  totalLayoffs: 0,
  prepaidMedicine: 0,
  indepSocialSecurity: 0,
  homeLoanInteres: 0,
  dependants: 0, // Number of people
  dependantsDeduction: 0,
  donations: 0,
  voluntaryContributions: 0,
  totalDeductions: 0
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.UPDATE_TOTAL_LAYOFFS_VALUE: return updateTotalLayoffsValue(state, action)
    case actions.UPDATE_TOTAL_DEDUCTIONS: return updateTotalDeductions(state, action)
    case actions.UPDATE_DEPENDANTS_DEDUCTION: return updateDependantsDeduction(state, action)
    case actions.UPDATE_DEPENDANTS_VALUE: return updateDependantsValue(state, action)
    case actions.UPDATE_DEDUCTION_VALUE: return updateDeductionValue(state, action)
    default: return state
  }
}

const updateTotalLayoffsValue = (state, action) => {
  return {
    ...state,
    totalLayoffs: action.data
  }
}

const updateTotalDeductions = (state, action) => {
  return {
    ...state,
    totalDeductions: action.data
  }
}

const updateDependantsDeduction = (state, action) => {
  return {
    ...state,
    dependantsDeduction: action.data
  }
}

const updateDependantsValue = (state, action) => {
  return {
    ...state,
    dependants: action.data
  }
}

const updateDeductionValue = (state, action) => {
  return {
    ...state,
    [action.data.name]: action.data.value
  }
}

export default reducer
