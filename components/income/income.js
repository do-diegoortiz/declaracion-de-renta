import React from 'react';
import { BlueButton } from '../buttons/buttons'
import NumberFormat from 'react-number-format'
import moment from 'moment'

import css from './income.scss'

class Income extends React.Component {
  state = {
    income: [],
    fromDate: new Date(),
    toDate: moment(new Date(2019, 11, 31), 'YYYY-MM-DD'),
    showSummary: false,
  }

  handleIncomeChange = newIncome => {
    this.setState((prevState) => {
      const incomeCopy = [...prevState.income]
      if (newIncome) {
        const newValue = parseInt(newIncome, 0)
        // This position is hardCoded while we add support for more income sources
        incomeCopy[0] = newValue
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
    console.log(this.state.fromDate)
  }

  calculateIncome = e => {
    e.preventDefault()
    this.setState({ showSummary: true })
  }

  render (){
    const { income, fromDate, toDate, showSummary } = this.state

    const totalDays = toDate.diff(fromDate, 'days', false)

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
    
          <NumberFormat
            thousandSeparator={true}
            prefix='$'
            placeholder='($) Salario mensual en COP'
            name='income'
            decimalScale='0'
            onValueChange={(values) => {this.handleIncomeChange(values.value)}}
          />
          {/* <input
            type='number'
            name='income'
            step='100'
            required
          /> */}
    
          <label htmlFor='de'>De</label>
          <input type='date' name='fromDate' onChange={e => this.handleDateChange(e)} />
    
          <label htmlFor='hasta'>Hasta</label>
          <input type='date' name='toDate' defaultValue='2019-12-31' onChange={e => this.handleDateChange(e)} />
    
          <input type='submit' value='Calcular' />
        </form>

      </div>
      {showSummary ? total : ''}
    
      <BlueButton label='Agregar +' onClick={this.calculateIncome} />
    </>
  }
}

export default Income