import moment from 'moment'

import * as actions from './actionTypes'
import * as actionCreators from './index';

const UVT = 34270

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

export const increaseIncomeSources = (...args) => {
  return (dispatch, getState) => {
    const [defaultWorkedDays] = args
    const sourcesCopy = getState().income.incomeSources

    sourcesCopy.push(
      {
        income: 0,
        retention: 0,
        workedDays: defaultWorkedDays,
        contract: ''
      }
    )

    dispatch(updateIncomeSources(sourcesCopy))
    dispatch(showSummary())
  }
}

export const updateIncomeSources = data => {
  return {
    type: actions.UPDATE_INCOME_SOURCES,
    data: data
  }
}


export const showSummary = () => {
  return (dispatch, getState) => {
    const incomeSources = getState().income.incomeSources
    if (incomeSources[0].income) {
      dispatch(actionCreators.updateShowSummaryValue())
    }
    
    dispatch(updateIncomeOutOfTaxes())
  }
}

const updateIncomeOutOfTaxes = () => {
  return (dispatch, getState) => {
    let outOfTaxCopy = 0
    const incomeSources = getState().income.incomeSources

    for (let i = 0; i < incomeSources.length; i++) {
      if (incomeSources[i].contract === 'nomina') {
        // If income is below certain UVT's is not 9% but 8%. Because 1% of Solidaridad wouldn't be included
        outOfTaxCopy += incomeSources[i].income * getMonthsWorked(incomeSources[i]) * 0.09
      } else {
        // As independant you pay based on the 40% of your salary. 12.5% in health and 16% in retirement.
        outOfTaxCopy += incomeSources[i].income * getMonthsWorked(incomeSources[i]) * 0.4 * 0.285
      }
    }

    dispatch(incomeOutOfTaxes(outOfTaxCopy))
  }
}

const incomeOutOfTaxes = data => {
  return {
    type: actions.UPDATE_INCOME_OUT_OF_TAXES,
    data: data
  }
}

export const getMonthsWorked = (incomeSource) => {
  const workedDays = incomeSource.workedDays
  return workedDays === 365 || workedDays === 364 ? 12 : (workedDays/30)
}

export const deleteIncomeSource = (index) => {
  return (dispatch, getState) => {
    const sourcesCopy = getState().income.incomeSources
    sourcesCopy.splice(index, 1)

    dispatch(updateIncomeSources(sourcesCopy))
  }
}


export const handleIncomeChange = (newIncome, index) => {
  return (dispatch, getState) => {
    if (newIncome) {
      const newValue = parseInt(newIncome, 0)

      const sourcesCopy = getState().income.incomeSources
      sourcesCopy[index].income = newValue

      dispatch(updateIncomeSources(sourcesCopy))

      if(sourcesCopy.length === 1 && newValue === 0) {
        dispatch(actionCreators.hideSummary())
      }

      dispatch(updateRetention(index, newValue, sourcesCopy[index].contract))
      dispatch(updateTotalIncome())
    }
  }
}

const updateRetention = (index, income, contract) => {
  return (dispatch, getState) => {
    const sourcesCopy = getState().income.incomeSources
    const totalSalary = (income / 30) * sourcesCopy[index].workedDays;

    if (contract === 'nomina') {
      // Table to calculate properly this value is here: https://www.gerencie.com/retencion-en-la-fuente-por-ingresos-laborales.html
      // Here we are using 19% since is the most common
      sourcesCopy[index].retention = income > 4770183 ? ((income - 87 * UVT) * 0.19) : 0
    } else if(contract === 'prestaciones') {
      // I've read we had to add 1% about ICA in certain scenarios
      // TODO: Verify is its 11% before paying health+retirement or over the base salary
      sourcesCopy[index].retention = income > 828116 ? (totalSalary * 0.6) * 0.11 : totalSalary * 0.11
    } else {
      sourcesCopy[index].retention = 0
    }

    dispatch(updateIncomeSources(sourcesCopy))
  }
}

export const updateTotalIncome = (layoffLastYear = 0) => {
  return (dispatch, getState) => {
    const sourcesCopy = getState().income.incomeSources
    const incomes = sourcesCopy.map((x, i) => {
      // TODO: Improve variable naming here
      const includesLayoffs = !x.stillThere
      const monthsWorked = getMonthsWorked(sourcesCopy[i])

      switch(x.contract) {
        case 'nomina':
          return x.income * monthsWorked * ((x.stillThere ? 13 : 14)/12) + includesLayoffs // 1/12 is about perks (Prima)
          // return x.income > (828116 * 4) ?
          //   x.income * monthsWorked * (0.91 + ((includesLayoffs ? 2 : 1) /12)) :
          //   x.income * monthsWorked * (0.92 + ((includesLayoffs ? 2 : 1) /12))
        case 'prestaciones':
          return x.income * monthsWorked
        case 'contratista':
          return x.income * monthsWorked
      }
    })

    const laysoffsLastYearsInState = getState().income.layoffsLastYear
    const newTotalIncome = incomes.reduce((acum, current)=> acum + current) + (layoffLastYear ? layoffLastYear : laysoffsLastYearsInState)
    
    dispatch(actionCreators.newHasToDeclare(newTotalIncome))
    dispatch(totalIncome(newTotalIncome))
  }
}

const totalIncome = (data) => {
  return {
    type: actions.UPDATE_TOTAL_INCOME,
    data: data
  }
}

export const handleContractChange = (e, index) => {
  return (dispatch, getState) => {
    const sourcesCopy = getState().income.incomeSources
    sourcesCopy[index].contract = e.target.value

    dispatch(updateIncomeSources(sourcesCopy))
    dispatch(updateRetention(index, sourcesCopy[index].income, e.target.value))
    dispatch(updateIncomeOutOfTaxes())
  }
}

export const handleWorkedDays = (days, index, stillThere) => {
  return (dispatch, getState) => {
    const sourcesCopy = getState().income.incomeSources
    sourcesCopy[index].workedDays = days
    sourcesCopy[index].stillThere = stillThere

    dispatch(updateIncomeSources(sourcesCopy))
    dispatch(updateTotalIncome())
    dispatch(updateTotalLayoffs())
    dispatch(updateIncomeOutOfTaxes())
  }
}

const updateTotalLayoffs = () => {
  return (dispatch, getState) => {
    const incomeSources = getState().income.incomeSources
    const deductions = getState().deduction

    let newTotalLayoffs = getState().income.layoffsLastYear

    newTotalLayoffs = incomeSources.reduce((acum, currentIncome, i) => {return currentIncome.stillThere ? acum + 0 : acum + (currentIncome.income * getMonthsWorked(incomeSources[i]) / 12)}, newTotalLayoffs)
    const newTotalDeductions = newTotalLayoffs + actionCreators.getNotLayoffDeductions(deductions)

    dispatch(actionCreators.updateTotalLayoffsValue(newTotalLayoffs))
    dispatch(actionCreators.updateTotalDeductions(newTotalDeductions))
  }
}


export const updateLayoffsLastYear = (data) => {
  return {
    type: actions.UPDATE_LAYOFFS_LAST_YEAR,
    data: data
  }
}


export const handleLayoff = () => {
  return (dispatch, getState) => {
    const layoffLastYear = getState().income.layoffsLastYear
    layoffLastYear ? dispatch(actionCreators.handleView('addDeductions')) : dispatch(emptyLayoff())
  }
}

const emptyLayoff = () => {
  return {
    type: actions.EMPTY_LAYOFF_INPUT
  }
}
