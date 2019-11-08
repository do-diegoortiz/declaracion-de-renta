import React from 'react';
import moment from 'moment'
import { BlueButton } from '../buttons/buttons'
import Summary from './summary/summary'
import FormIncome from './formIncome/formIncome'

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
    // e.preventDefault()
    // e.persist()
    const datesCopy = [...this.state.datesPerIncome]
    let newDateCopy = new Date();

    if (e.target) {
      newDateCopy = moment(e.target.value, 'YYYY-MM-DD')
    }

    datesCopy[index][e.target.name] = newDateCopy

    const newWorkedDays = datesCopy[index].toDate.diff(datesCopy[index].fromDate, 'days', false)

    this.setState({datesPerIncome:datesCopy})
    this.props.handleWorkedDays(newWorkedDays, index)
  }

  render (){
    const { summaryVisible, incomeSources, showSummary } = this.props
    // income, contract
    
    const forms = [];
    const jobsSummary = [];

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
        />
      )
    }

    return <>
      <div className={css.cover}>
        {forms}
      </div>

      <BlueButton label='Agregar Ingreso+' onClick={this.createNewForm} />

      <div className={css.summaryContainer}>
        {summaryVisible && jobsSummary}
      </div>
    </>
  }
}

export default Income