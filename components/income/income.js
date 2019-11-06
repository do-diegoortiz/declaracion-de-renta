import React from 'react';
import { BlueButton } from '../buttons/buttons'
import NumberFormat from 'react-number-format'
import Summary from './summary/summary'

import css from './income.scss'

class Income extends React.Component {
  render (){
    const { income, fromDate, toDate, showSummary, contract, incomeSources } = this.props

    const totalDays = toDate.diff(fromDate, 'days', false)
    const forms = [];

    for (let i = 0; i < incomeSources; i++) {
      forms.push(
        <form className={css.formContainer} onSubmit={this.props.calculateIncome}  key={i}>
          <h1>{i+1}</h1>
          <label htmlFor='contract'>Contrato</label>
          <select name='contract' id='contract' value={contract} onChange={this.props.handleContractChange}>
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
            onValueChange={(values) => {this.props.handleIncomeChange(values.value)}}
            required
          />
    
          <label htmlFor='de'>De</label>
          <input type='date' name='fromDate' onChange={e => this.props.handleDateChange(e)} />
    
          <label htmlFor='hasta'>Hasta</label>
          <input type='date' name='toDate' defaultValue='2019-12-31' onChange={e => this.props.handleDateChange(e)} />
    
          <input type='submit' value='Calcular' />
        </form>
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