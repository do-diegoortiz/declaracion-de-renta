import moment from 'moment'

export const initialState = {
  income: {
    showIncomeDetails: false,
    datesPerIncome: [
      {
        fromDate: moment(new Date(2019, 0, 1)),
        toDate: moment(new Date(2019, 11, 31))
      }
    ],
    newWorkedDays: 0,
    jobWorkedDays: 0,
    stillThere: false,
    incomeSources: [
      {
        income: 0,
        retention: 0,
        workedDays: 365,
        stillThere: true, // Needed in 'nomina' contract to know if "Cesantias" were and income or not
        contract: '' // The options are 'nomina, 'prestaciones' and 'contratista'
      }
    ],
    layoffsLastYear: 0, // Locally known as "Cesantias"
    totalIncome: 0,
    incomeOutOfTaxes: 0
  },
  home: {
    hasToDeclare: false, // When gross income > 1400 UVT
    summaryVisible: false,
    deductionsVisible: false
  }
}
