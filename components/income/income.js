import React from 'react';
import moment from 'moment'
import { BlueButton } from '../buttons/buttons'
import Summary from './summary/summary'
import FormIncome from './formIncome/formIncome'
import TotalSummary from './totalSumary/totalSummary'

import css from './income.scss'

class Income extends React.Component {
  state = {
    datesPerIncome: [
      {
        fromDate: new Date(),
        toDate: moment(new Date(2019, 11, 31))
      }
    ]
  }

  createNewForm = () => {
    const datesCopy = [...this.state.datesPerIncome]
    datesCopy.push(
      {
        fromDate: new Date(),
        toDate: moment(new Date(2019, 11, 31))
      }
    )

    this.setState({datesPerIncome: datesCopy})
    this.props.increaseIncomeSources()
  }

  handleDateChange = (e, index) => {
    const datesCopy = [...this.state.datesPerIncome]
    let newDateCopy = new Date();

    if (e.target) { newDateCopy = moment(e.target.value, 'YYYY-MM-DD') }

    datesCopy[index][e.target.name] = newDateCopy
    const newWorkedDays = datesCopy[index].toDate.diff(datesCopy[index].fromDate, 'days', false)

    this.setState({datesPerIncome:datesCopy})
    this.props.handleWorkedDays(newWorkedDays, index)
  }

  render (){
    const { summaryVisible, incomeSources, showSummary } = this.props
    
    const forms = [];
    const jobsSummary = [];
    const totalIncome = incomeSources.map(x => x.income * (x.workedDays/30)).reduce((acum, current)=> acum + current)
    let totalIncomeNoTaxes = 0

    for (let incomeIndex = 0; incomeIndex < incomeSources.length; incomeIndex++) {
      forms.push(
        <FormIncome
          handleDateChange={this.handleDateChange}
          handleIncomeChange={this.props.handleIncomeChange}
          handleContractChange={this.props.handleContractChange}
          showSummary={showSummary}
          contract={incomeSources[incomeIndex].contract}
          incomeIndex={incomeIndex}
          key={incomeIndex}
        />
      )

      jobsSummary.push(
        <Summary
          income={incomeSources[incomeIndex].income}
          totalDays={incomeSources[incomeIndex].workedDays}
          contract={incomeSources[incomeIndex].contract}
          incomeIndex={incomeIndex}
          key={incomeIndex}
        />
      )

      if (incomeSources[incomeIndex].contract === 'nomina') {
        totalIncomeNoTaxes += incomeSources[incomeIndex].income * (incomeSources[incomeIndex].workedDays/30) * 0.09
      } else {
        totalIncomeNoTaxes += incomeSources[incomeIndex].income * (incomeSources[incomeIndex].workedDays/30) * 0.4 * 0.285
      }
    }

    return <>
      <div className={css.cover}>
        {forms}
      </div>

      <BlueButton label='Agregar Ingreso+' onClick={this.createNewForm} />

      <div className={css.summaryContainer}>
        {summaryVisible && jobsSummary}
        {summaryVisible && jobsSummary.length > 1 && <TotalSummary
          income={totalIncome}
          incomeWithoutTaxes={totalIncomeNoTaxes}
        />}
      </div>
    </>
  }
}

export default Income