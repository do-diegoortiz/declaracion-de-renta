import React from 'react';
import { BlueButton } from '../buttons/buttons'
import NumberFormat from 'react-number-format'
import moment from 'moment'
import Summary from './summary/summary'

import css from './income.scss'

class Income extends React.Component {
  state = {
    income: 0,
    fromDate: new Date(),
    toDate: moment(new Date(2019, 11, 31), 'YYYY-MM-DD'),
    showSummary: false,
    contract: 'nomina'
  }

  handleIncomeChange = newIncome => {
    this.setState(() => {
      let incomeCopy
      if (newIncome) {
        const newValue = parseInt(newIncome, 0)
        incomeCopy = newValue
      }

      return { income: incomeCopy }
    })
  }

  handleDateChange = e => {
    e.preventDefault()
    e.persist()

    this.setState(() => {
      let newDateCopy = new Date();

      if (e.target) {
        newDateCopy = moment(e.target.value, 'YYYY-MM-DD')
      }

      return { [e.target.name]: newDateCopy }
    })
  }

  handleContractChange = e => {
    this.setState({contract: e.target.value})
  }

  calculateIncome = e => {
    e.preventDefault()
    this.setState({ showSummary: true })
  }

  render (){
    const { income, fromDate, toDate, showSummary, contract } = this.state

    const totalDays = toDate.diff(fromDate, 'days', false)

    return <>
      <div className={css.cover}>
        <form className={css.formContainer} onSubmit={this.calculateIncome}>
          <label htmlFor='contract'>Contrato</label>
          <select name='contract' id='contract' value={contract} onChange={this.handleContractChange}>
            <option value='nomina'>Nómina</option>
            <option value='prestaciones'>Prestacion</option>
            <option value='contratista'>Contratista</option>
          </select>
    
          <NumberFormat
            thousandSeparator={true}
            prefix='$'
            placeholder='($) Salario mensual en COP'
            name='income'
            decimalScale='0'
            onValueChange={(values) => {this.handleIncomeChange(values.value)}}
            required
          />
    
          <label htmlFor='de'>De</label>
          <input type='date' name='fromDate' onChange={e => this.handleDateChange(e)} />
    
          <label htmlFor='hasta'>Hasta</label>
          <input type='date' name='toDate' defaultValue='2019-12-31' onChange={e => this.handleDateChange(e)} />
    
          <input type='submit' value='Calcular' />
        </form>

      </div>

      {showSummary && <Summary income={income} totalDays={totalDays} contract={contract} />}
    
      <BlueButton label='Agregar +' onClick={this.calculateIncome} />
    </>
  }
}

export default Income