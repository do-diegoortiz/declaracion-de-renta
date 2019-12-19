import * as actions from './actionTypes'

const UVT = 34270

export const newHasToDeclare = newTotalIncome => {
  return (dispatch) => {
    const hasToDeclare = newTotalIncome > 1400 * UVT ? true : false
    dispatch(updateHasToDeclareValue(hasToDeclare))
  }
}

const updateHasToDeclareValue = (data) => {
  return {
    type: actions.HAS_TO_DECLARE,
    data: data
  }
}

export const updateShowSummaryValue = () => {
  return {
    type: actions.SHOW_SUMMARY
  }
}

export const hideSummary = () => {
  return {
    type: actions.HIDE_SUMMARY
  }
}

export const showDeductions = e => {
  e.preventDefault()

  return (dispatch) => {
    dispatch(deductionsVisible())
  }
}

const deductionsVisible = () => {
  return {
    type: actions.SHOW_DEDUCTIONS
  }
}
