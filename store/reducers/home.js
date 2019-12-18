import * as actions from '../actions/actionTypes';

const initialState = {
  // https://bogota.gov.co/mi-ciudad/hacienda/quienes-y-cuando-declarar-renta-en-2019
  hasToDeclare: false, // When gross income > 1400 UVT
  summaryVisible: false,
  deductionsVisible: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.HAS_TO_DECLARE: return hasToDeclare(state, action)
    case actions.SHOW_SUMMARY: return showSummary(state)
    case actions.HIDE_SUMMARY: return hideSummary(state)
    case actions.SHOW_DEDUCTIONS: return showDeductions(state)
    default: return state
  }
}

const hasToDeclare = (state, action) => {
  return {
    ...state,
    hasToDeclare: action.data
  }
}

const showSummary = (state) => {
  return {
    ...state,
    summaryVisible: true
  }
}

const hideSummary = (state) => {
  return {
    ...state,
    summaryVisible: false
  }
}

const showDeductions = (state) => {
  return {
    ...state,
    deductionsVisible: true
  }
}

export default reducer;
