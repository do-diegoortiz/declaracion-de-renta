import React from 'react';
import moment from 'moment'
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format'
import css from './formIncome.scss';

const FormIncome = ({ handleDateChange, handleIncomeChange, handleContractChange, showSummary, contract, incomeIndex, fromDate, toDate }) => {
  FormIncome.propTypes = {
    handleDateChange: PropTypes.func.isRequired,
    handleIncomeChange: PropTypes.func.isRequired,
    handleContractChange: PropTypes.func.isRequired,
    showSummary: PropTypes.func.isRequired,
    contract: PropTypes.string.isRequired,
    incomeIndex: PropTypes.number.isRequired,
    fromDate: PropTypes.instanceOf(moment).isRequired,
    toDate: PropTypes.instanceOf(moment).isRequired
  };

  return (
    <form className={css.formContainer} onSubmit={showSummary}  key={incomeIndex}>
      <h1 className={css.hideMobile}>{incomeIndex+1}</h1>
      <label id='contract' className={css.hideMobile}>Contrato</label>
      <select name='contract' className={css.contract} aria-labelledby='contract' value={contract} onChange={ e => handleContractChange(e, incomeIndex)}>
        <option value='nomina'>Nómina</option>
        <option value='prestaciones'>Prestación</option>
        <option value='contratista'>Contratista</option>
      </select>

      <NumberFormat
        aria-label="income"
        className={css.salaryContainer}
        thousandSeparator={true}
        prefix='$'
        placeholder='Salario mensual'
        name='income'
        decimalScale={0}
        onValueChange={(values) => {handleIncomeChange(values.value, incomeIndex)}}
        required
      />

      <label>De
        <input type='date' name='fromDate' value={fromDate.format('YYYY-MM-DD')} onChange={e => handleDateChange(e, incomeIndex)} />
      </label>
      

      <label>Hasta
        <input type='date' name='toDate' value={toDate.format('YYYY-MM-DD')} onChange={e => handleDateChange(e, incomeIndex)} />
      </label>

      <input type='submit' value='Calcular' />
    </form>
  );
};

export default FormIncome
