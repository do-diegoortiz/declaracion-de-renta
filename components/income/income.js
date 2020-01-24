import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'
import { BlueLink, GrayButton } from '../buttons/buttons'
import Summary from './summary/summary'
import FormIncome from './formIncome/formIncome'
import TotalSummary from './totalSumary/totalSummary'

import css from './income.scss'

class Income extends Component {

  createNewForm = async () => {
    await this.props.insertNewDate()
    this.props.increaseIncomeSources(this.props.income.newWorkedDays)
  }

  handleDateChange = async (e, index) => {
    await this.props.handleDateChange(e, index)
    this.props.handleWorkedDays(this.props.income.jobWorkedDays, index, this.props.income.stillThere)
  }

  render (){
    const { handleIncomeChange, handleContractChange, handleLayoffChange, deleteIncomeSource, showSummary, showDeductions, // Methods
      summaryVisible, incomeSources, hasToDeclare, incomeOutOfTaxes, layoffsLastYear, totalIncome, updateIncomeDetails } = this.props
    const { showIncomeDetails, datesPerIncome } = this.props.income
    
    const forms = [];
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
          income={incomeSources[incomeIndex].income}
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
      <section className={css.cover}>
        {forms}
      </section>

      <div className={css.actionButtons}>
        <BlueLink label='Crear otro ingreso +' onClick={this.createNewForm} fontSize='1.8rem' />
      </div>

      <div className={css.summaryContainer}>
        {summaryVisible && <TotalSummary
          income={totalIncome}
          incomeOutOfTaxes={incomeOutOfTaxes}
          hasToDeclare={hasToDeclare}
          showDeductions={showDeductions}
        />}
        {summaryVisible && !showIncomeDetails && <GrayButton label='Ver desglose de ingresos' onClick={updateIncomeDetails} /> }
        {showIncomeDetails && jobsSummary}
      </div>
    </>
  }
}

const mapStateToProps = state => {
  return {
    income: state.income
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateIncomeDetails: () => dispatch(actions.updateIncomeDetails()),
    insertNewDate: () => dispatch(actions.insertNewDate()),
    handleDateChange: (e, index) => dispatch(actions.handleDateChange(e, index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Income)
