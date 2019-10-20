import React from 'react';
import { BlueButton } from '../buttons/buttons'
import NumberFormat from 'react-number-format'
import moment from 'moment'

import css from './income.scss'

class Income extends React.Component {
  state = {
    income: [],
    fromDate: new Date(),
    toDate: new Date('2019-12-31'),
    showSummary: false,
  }

  handleIncomeChange = e => {
    e.preventDefault()
    e.persist()

    this.setState((prevState) => {
      const incomeCopy = [...prevState.income]
      if (e.target) {
        const newValue = parseInt(e.target.value, 0)
        incomeCopy[0] = newValue
      }

      return { income: incomeCopy }
    })
  }

  handleFromDateChange = e => {
    e.preventDefault()
    e.persist()

    this.setState(() => {
      let fromDateCopy = new Date();
      if (e.target) {
        const newFromDate = moment(e.target.value, 'YYYY-MM-DD')
        fromDateCopy = newFromDate
      }

      return { fromDate: fromDateCopy }
    })
  }

  calculateIncome = e => {
    e.preventDefault()
    this.setState({ showSummary: true })
  }

  render (){
    const { income, fromDate, showSummary } = this.state

    const lastDayOfTheYearForTesting = moment(new Date(2019, 11, 31), 'YYYY-MM-DD')
    const totalDays = lastDayOfTheYearForTesting.diff(fromDate, 'days', false)

    const total = income.map(salary => (
      <h1 key={salary}>
      En este trabajo los ingresos del año serán:
        <NumberFormat
          value={(salary / 30) * totalDays}
          thousandSeparator={true}
          prefix='$'
          decimalScale='0'
        />
      </h1>
    ))

    return <>
      <div className={css.cover}>
        <form className={css.formContainer} onSubmit={this.calculateIncome}>
          <label htmlFor='salario'>Contrato</label>
          <select name='' id=''>
            <option value='nomina'>Nomina</option>
            <option value='prestaciones'>Prestacion</option>
          </select>
    
          <input
            type='number'
            name='income'
            step='100'
            placeholder='($) Salario mensual en COP'
            onChange={this.handleIncomeChange}
          />
    
          <label htmlFor='de'>De</label>
          <input type='date' name='de' onChange={this.handleFromDateChange} />
    
          <label htmlFor='hasta'>Hasta</label>
          <input type='date' name='hasta' value='2019-12-31' />
    
          <input type='submit' value='Calcular' />
        </form>

      </div>
      {showSummary > 0 ? total : ''}
    
      <BlueButton label='Agregar +' onClick={this.calculateIncome} />
    </>
  }
}

export default Income