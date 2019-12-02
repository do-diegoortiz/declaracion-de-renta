import React from 'react';
import moment from 'moment'
import { BlueButton, RedButton, GrayButton } from '../buttons/buttons'
import Summary from './summary/summary'
import FormIncome from './formIncome/formIncome'
import FormLayoff from './formLayoff/formLayoff'
import TotalSummary from './totalSumary/totalSummary'

import css from './income.scss'

class Income extends React.Component {
  state = {
    showIncomeDetails: false,
    datesPerIncome: [
      {
        fromDate: moment(new Date(2019, 0, 1)),
        toDate: moment(new Date(2019, 11, 31))
      }
    ]
  }

  updateIncomeDetails = () => {
    this.setState({ showIncomeDetails: true })
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
    const stillThere = datesCopy[index].toDate._d.getDate() === 31 && datesCopy[index].toDate._d.getMonth() === 11

    this.setState({datesPerIncome:datesCopy})
    this.props.handleWorkedDays(newWorkedDays, index, stillThere)
  }

  render (){
    const { handleIncomeChange, handleContractChange, handleLayoffChange, deleteIncomeSource, showSummary, showDeductions, // Methods
      summaryVisible, incomeSources, hasToDeclare, incomeOutOfTaxes, layoffsLastYear, totalIncome } = this.props
    const { showIncomeDetails, datesPerIncome } = this.state
    
    const forms = [<FormLayoff handleLayoffChange={handleLayoffChange} layoffsLastYear={layoffsLastYear} />];
    const jobsSummary = [];

    for (let incomeIndex = 0; incomeIndex < incomeSources.length; incomeIndex++) {
      forms.push(
        <FormIncome
          handleDateChange={this.handleDateChange}
          handleIncomeChange={handleIncomeChange}
          handleContractChange={handleContractChange}
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
          toDate={datesPerIncome[incomeIndex].toDate}
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
        <BlueButton label='Agregar Ingreso+' onClick={this.createNewForm} minHeight='4.8rem' />
        <RedButton label='Calcular' onClick={showSummary} />
      </div>

      <div className={css.summaryContainer}>
        {summaryVisible && <TotalSummary
          income={totalIncome}
          incomeOutOfTaxes={incomeOutOfTaxes}
          hasToDeclare={hasToDeclare}
          showDeductions={showDeductions}
        />}
        {summaryVisible && !showIncomeDetails && <GrayButton label='Ver desglose de ingresos' onClick={this.updateIncomeDetails} /> }
        {showIncomeDetails && jobsSummary}
      </div>
    </>
  }
}

export default Income