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
