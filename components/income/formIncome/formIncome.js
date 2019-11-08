import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format'
import css from './formIncome.scss';

const FormIncome = ({ handleDateChange, handleIncomeChange, handleContractChange, contract, incomeIndex }) => {
  FormIncome.propTypes = {
    handleDateChange: PropTypes.func.isRequired,
    handleIncomeChange: PropTypes.func.isRequired,
    handleContractChange: PropTypes.func.isRequired,
    contract: PropTypes.string.isRequired,
    incomeIndex: PropTypes.number.isRequired,
  };

  return (
    <form className={css.formContainer}>
    {/* <form className={css.formContainer} onSubmit={calculateIncome}  key={incomeIndex}></form> */}
      <h1>{incomeIndex+1}</h1>
      <label htmlFor='contract'>Contrato</label>
      <select name='contract' id='contract' value={contract} onChange={handleContractChange}>
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
        onValueChange={(values) => {handleIncomeChange(values.value)}}
        required
      />

      <label htmlFor='de'>De</label>
      <input type='date' name='fromDate' onChange={e => handleDateChange(e, incomeIndex)} />

      <label htmlFor='hasta'>Hasta</label>
      <input type='date' name='toDate' defaultValue='2019-12-31' onChange={e => handleDateChange(e, incomeIndex)} />

      <input type='submit' value='Calcular' />
    </form>
  );
};

export default FormIncome