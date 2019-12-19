import React from 'react';
import moment from 'moment'
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format'

import DeleteIcon from '../../../public/icons/delete'
import css from './formIncome.scss';

const FormIncome = ({ handleDateChange, handleIncomeChange, handleContractChange, deleteIncomeSource, contract, incomeIndex, fromDate, toDate }) => {
  FormIncome.propTypes = {
    handleDateChange: PropTypes.func.isRequired,
    handleIncomeChange: PropTypes.func.isRequired,
    handleContractChange: PropTypes.func.isRequired,
    deleteIncomeSource: PropTypes.func.isRequired,
    contract: PropTypes.string.isRequired,
    incomeIndex: PropTypes.number.isRequired,
    fromDate: PropTypes.instanceOf(moment).isRequired,
    toDate: PropTypes.instanceOf(moment).isRequired
  };

  return (
    <form className={css.formContainer} key={incomeIndex}>
      <h1 className={css.hideMobile}>{incomeIndex+1}</h1>
      <div className={css.dropdownContainer}>
        <label id='contract' className={css.dropdownTitle}>Contrato</label>
        <select name='contract' className={`${css.selectContract} ${css.contract}`} aria-labelledby='contract' value={contract} onChange={ e => handleContractChange(e, incomeIndex)}>
          <option value='nomina'>Nómina</option>
          <option value='prestaciones'>Servicios</option>
          <option value='contratista'>Contratista</option>
        </select>
      </div>

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

      <button
        className={incomeIndex ? css.deleteButton: `${css.disabledButton} ${css.hideMobile}`}
        onClick={() => deleteIncomeSource(incomeIndex)}
        type='button'
        aria-label="Delete Income"
      >
        <DeleteIcon />
      </button>
    </form>
  );
};

export default FormIncome
