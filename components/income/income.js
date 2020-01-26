import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'
import { BlueLink, BlueButton, GreenButton } from '../buttons/buttons'
import Summary from './summary/summary'
import FormIncome from './formIncome/formIncome'
import Modal from '../modal/modal'

import css from './income.scss'

class Income extends Component {

  state = {
    openModal: false
  }

  createNewForm = async () => {
    await this.props.insertNewDate()
    this.props.increaseIncomeSources(this.props.income.newWorkedDays)
  }

  handleDateChange = async (e, index) => {
    await this.props.handleDateChange(e, index)
    this.props.handleWorkedDays(this.props.income.jobWorkedDays, index, this.props.income.stillThere)
  }

  openModal = () => {
    this.setState({openModal : true})
  }

  closeModal = () => {
    this.setState({openModal : false})
  }

  render (){
    const { handleIncomeChange, handleContractChange, handleLayoffChange, deleteIncomeSource, showSummary, showDeductions, handleView,// Methods
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

    return (
      <>
        <Modal
          show={this.state.openModal}
          modalClosed={this.closeModal}
        >
          <p className={css.modalText}>Si para el 31/12/2018 estabas contratado por nómina y seguiste en ese mismo trabajo en enero de 2019. Las cesantias te las consignaron en febrero, o en tu liquidación si renunciaste antes. <br />Son ingresos laborales de 2019, si es tu caso haz click en el botón SÍ.</p>
        </Modal>
        <section className={css.cover}>
          {forms}
        </section>

        <div className={css.actionButtons}>
          <BlueLink label='Crear otro ingreso +' onClick={this.createNewForm} fontSize='1.8rem' />
        </div>

        <div className={css.layoffContainer}>
          <p className={css.question}>¿Trabajaste en 2018? <span onClick={this.openModal}>ℹ️</span></p>
          <section className={css.buttonContainer}>
            <GreenButton label='👍 SÍ' width='15rem' minHeight='5.2rem' fontSize='1.3rem' onClick={() => handleView('addLayoff')}/>
            <BlueButton label='👎 NO, HACER LOS CALCULOS YA' width='15rem' minHeight='5.2rem' fontSize='1.2rem' />
          </section>
        </div>
      </>
    )
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
    handleDateChange: (e, index) => dispatch(actions.handleDateChange(e, index)),
    handleView: (newView) => dispatch(actions.handleView(newView))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Income)
