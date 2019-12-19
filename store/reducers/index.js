import { combineReducers } from 'redux'
import income from './income'
import home from './home'
import deduction from './deductions'

export default combineReducers({
  income,
  home,
  deduction
})
