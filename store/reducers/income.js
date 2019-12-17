import moment from 'moment'
import * as actions from '../actions/actionTypes';

const initialState = {
  showIncomeDetails: false,
  datesPerIncome: [
    {
      fromDate: moment(new Date(2019, 0, 1)),
      toDate: moment(new Date(2019, 11, 31))
    }
  ],
  newWorkedDays: 0,
  jobWorkedDays: 0,
  stillThere: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.SHOW_INCOME_DETAIL: return showIncomeDetails(state);
    case actions.INSERT_NEW_DATES: return insertNewDate(state, action);
    case actions.CALCULATE_WORKED_DAYS: return newWorkedDays(state, action);
    case actions.UPDATE_NEW_JOB_DATA: return updateNewJobData(state, action);
    default: return state;
  }
}

const showIncomeDetails = (state) => {
  return {
    ...state,
    showIncomeDetails: true
  }
}

const insertNewDate = (state, action) => {
  return {
    ...state,
    datesPerIncome: action.data
  }
}

const newWorkedDays = (state, action) => {
  return {
    ...state,
    newWorkedDays: action.data
  }
}

const updateNewJobData = (state, action) => {
  return {
    ...state,
    jobWorkedDays: action.data.jobWorkedDays,
    stillThere: action.data.stillThere
  }
}

export default reducer;
