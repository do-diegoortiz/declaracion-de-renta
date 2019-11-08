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
    const { showSummary, incomeSources } = this.props
    // income, contract
    
    const forms = [];

    for (let incomeIndex = 0; incomeIndex < incomeSources.length; incomeIndex++) {
      const fromDate = new Date()
      const toDate = moment(new Date(2019, 11, 31), 'YYYY-MM-DD')
      const totalDays = 

      forms.push(
        <>
          <FormIncome
            handleDateChange={this.handleDateChange}
            handleIncomeChange={this.props.handleIncomeChange}
            handleContractChange={this.props.handleContractChange}
            contract={incomeSources[incomeIndex].contract}
            incomeIndex={incomeIndex}
            key={incomeIndex}
          />
          <h1>{incomeSources[incomeIndex].workedDays}</h1>
        </>
      )
    }

    return <>
      <div className={css.cover}>
        {forms}
      </div>

      <BlueButton label='Agregar Ingreso+' onClick={this.props.increaseIncomeSources} />

      {showSummary && <Summary income={income} totalDays={totalDays} contract={contract} />}
    </>
  }
}

export default Income