import moment from 'moment'
import * as actions from '../actions/actionTypes';

const initialState = {
  showIncomeDetails: false,
  datesPerIncome: [
    {
      fromDate: moment(new Date(2019, 0, 1)),
      toDate: moment(new Date(2019, 11, 31))
    }
  ]
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.SHOW_INCOME_DETAIL: return showIncomeDetails(state);
    default: return state;
  }
}

const showIncomeDetails = (state) => {
  return {
    ...state,
    showIncomeDetails: true
  }
}

export default reducer;
