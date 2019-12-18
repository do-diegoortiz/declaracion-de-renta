import moment from 'moment'
import * as actions from './actionTypes'

export const updateIncomeDetails = () => {
  return {
    type: actions.SHOW_INCOME_DETAIL
  }
}

export const insertNewDate = () => {
  return (dispatch, getState) => {
    const datesCopy = getState().income.datesPerIncome
    const index = datesCopy.length

    datesCopy.push(
      {
        fromDate: datesCopy[index - 1].toDate,
        toDate: moment(new Date(2019, 11, 31))
      }
    )
    const newWorkedDays = datesCopy[index].toDate.diff(datesCopy[index].fromDate, 'days', false)
    
    dispatch(updateNewWorkedDays(newWorkedDays))
    dispatch(updateDatesPerIncome(datesCopy))
  }
}

const updateDatesPerIncome = (data) => {
  return {
    type: actions.INSERT_NEW_DATES,
    data: data
  }
}

const updateNewWorkedDays = (data) => {
  return {
    type: actions.CALCULATE_WORKED_DAYS,
    data: data
  }
}

export const handleDateChange = (e, index) => {
  return (dispatch, getState) => {
    const datesCopy = getState().income.datesPerIncome
    let newDateCopy = new Date();

    if (e.target) { newDateCopy = moment(e.target.value, 'YYYY-MM-DD') }

    datesCopy[index][e.target.name] = newDateCopy
    const jobWorkedDays = datesCopy[index].toDate.diff(datesCopy[index].fromDate, 'days', false)
    const stillThere = datesCopy[index].toDate._d.getDate() === 31 && datesCopy[index].toDate._d.getMonth() === 11

    dispatch(updateNewJobData(jobWorkedDays, stillThere))
  }
}

const updateNewJobData = (jobWorkedDays, stillThere) => {
  return {
    type: actions.UPDATE_NEW_JOB_DATA,
    data: { jobWorkedDays, stillThere }
  }
}
