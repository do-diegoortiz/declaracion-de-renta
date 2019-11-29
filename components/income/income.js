import React from 'react';
import moment from 'moment'
import { BlueButton, RedButton } from '../buttons/buttons'
import Summary from './summary/summary'
import FormIncome from './formIncome/formIncome'
import TotalSummary from './totalSumary/totalSummary'

import css from './income.scss'

class Income extends React.Component {
  state = {
    datesPerIncome: [
      {
        fromDate: moment(new Date(2019, 0, 1)),
        toDate: moment(new Date(2019, 11, 31))
      }
    ]
  }

  createNewForm = () => {
    const datesCopy = [...this.state.datesPerIncome]
    const index = datesCopy.length

    datesCopy.push(
      {
        fromDate: datesCopy[index - 1].toDate,
        toDate: moment(new Date(2019, 11, 31))
      }
    )
    
    const newWorkedDays = datesCopy[index].toDate.diff(datesCopy[index].fromDate, 'days', false)

    this.setState({datesPerIncome: datesCopy})
    this.props.increaseIncomeSources(newWorkedDays)
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
    const { deleteIncomeSource, summaryVisible, incomeSources, showSummary, incomeOutOfTaxes, totalIncome } = this.props
    const { datesPerIncome } = this.state
    
    const forms = [];
    const jobsSummary = [];

    for (let incomeIndex = 0; incomeIndex < incomeSources.length; incomeIndex++) {
      forms.push(
        <FormIncome
          handleDateChange={this.handleDateChange}
          handleIncomeChange={this.props.handleIncomeChange}
          handleContractChange={this.props.handleContractChange}
          deleteIncomeSource={deleteIncomeSource}
          contract={incomeSources[incomeIndex].contract}
          incomeIndex={incomeIndex}
          fromDate={datesPerIncome[incomeIndex].fromDate}
          toDate={datesPerIncome[incomeIndex].toDate}
          key={incomeIndex}
        />
      )

      jobsSummary.push(
        <Summary
          income={incomeSources[incomeIndex].income}
          workedDays={incomeSources[incomeIndex].workedDays}
          contract={incomeSources[incomeIndex].contract}
          retention={incomeSources[incomeIndex].retention}
          incomeIndex={incomeIndex}
          key={incomeIndex}
        />
      )
    }

    return <>
      <div className={css.cover}>
        {forms}
      </div>

      <div className={css.actionButtons}>
        <BlueButton label='Agregar Ingreso+' onClick={this.createNewForm} />
        <RedButton label='Calcular' onClick={showSummary} />
      </div>

      <div className={css.summaryContainer}>
        {summaryVisible && jobsSummary}
        {summaryVisible && <TotalSummary
          income={totalIncome}
          incomeOutOfTaxes={incomeOutOfTaxes}
        />}
      </div>
    </>
  }
}

export default Income