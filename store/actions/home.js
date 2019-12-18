import * as actions from './actionTypes'

export const showSummary = () => {
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
