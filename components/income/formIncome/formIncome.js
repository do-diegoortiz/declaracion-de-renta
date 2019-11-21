import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format'
import css from './formIncome.scss';

const FormIncome = ({ handleDateChange, handleIncomeChange, handleContractChange, showSummary, contract, incomeIndex }) => {
  FormIncome.propTypes = {
    handleDateChange: PropTypes.func.isRequired,
    handleIncomeChange: PropTypes.func.isRequired,
    handleContractChange: PropTypes.func.isRequired,
    showSummary: PropTypes.func.isRequired,
    contract: PropTypes.string.isRequired,
    incomeIndex: PropTypes.number.isRequired,
  };

  return (
    <form className={css.formContainer} onSubmit={showSummary}  key={incomeIndex}>
      <h1 className={css.hideMobile}>{incomeIndex+1}</h1>
      <label htmlFor='contract' className={css.hideMobile}>Contrato</label>
      <select name='contract' className={css.contract} id='contract' value={contract} onChange={ e => handleContractChange(e, incomeIndex)}>
        <option value='nomina'>Nómina</option>
        <option value='prestaciones'>Prestacion</option>
        <option value='contratista'>Contratista</option>
      </select>

        <NumberFormat
          className={css.salaryContainer}
          thousandSeparator={true}
          prefix='$'
          placeholder='($) Salario mensual en COP'
          name='income'
          decimalScale='0'
          onValueChange={(values) => {handleIncomeChange(values.value, incomeIndex)}}
          required
        />

      <label htmlFor='de' className={css.hideMobile}>De</label>
      <input type='date' name='fromDate' onChange={e => handleDateChange(e, incomeIndex)} />

      <label htmlFor='hasta' className={css.hideMobile}>Hasta</label>
      <input type='date' name='toDate' defaultValue='2019-12-31' onChange={e => handleDateChange(e, incomeIndex)} />

      <input type='submit' value='Calcular' />
    </form>
  );
};

export default FormIncome