import { combineReducers } from 'redux'
import income from './income'
import home from './home'
import deduction from './deductions'
import outcome from './outcome'

export default combineReducers({
  income,
  home,
  deduction,
  outcome
})
