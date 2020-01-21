import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'

import DeleteIcon from '../../../public/icons/delete'
import css from './formIncome.scss';

const FormIncome = ({ handleDateChange, handleIncomeChange, handleContractChange, deleteIncomeSource, contract, incomeIndex, income, fromDate, toDate }) => {
  FormIncome.propTypes = {
    handleDateChange: PropTypes.func.isRequired,
    handleIncomeChange: PropTypes.func.isRequired,
    handleContractChange: PropTypes.func.isRequired,
    deleteIncomeSource: PropTypes.func.isRequired,
    contract: PropTypes.string.isRequired,
    incomeIndex: PropTypes.number.isRequired,
    income: PropTypes.number.isRequired,
    fromDate: PropTypes.instanceOf(moment).isRequired,
    toDate: PropTypes.instanceOf(moment).isRequired
  };

  return (
    <form key={incomeIndex}>
      <div className={css.formContainer}>
        {contract && (
          <label id='contract' className={css.dropdownTitle}>Tipo de empleo</label>
        )}
        <select 
          name='contract' 
          className={`${css.styledInput} ${css.caret} ${css.contract}`}
          aria-labelledby='contract' 
          onChange={ e => handleContractChange(e, incomeIndex)}
          value={contract}
          required
        >
          <option className={css.contractOption} value='' disabled>Tipo de empleo</option>
          <option className={css.contractOption} value='nomina'>Nómina</option>
          <option className={css.contractOption} value='prestaciones'>Servicios</option>
          <option className={css.contractOption} value='contratista'>Contratista</option>
        </select>

        <div>
          {income > 0 && (
            <label id='contract' className={css.dropdownTitle}>Ingreso mensual</label>
          )}
          <section className={css.styledInput}>
            <NumberFormat
              aria-label="income"
              className={css.salaryContainer}
              thousandSeparator={true}
              prefix='$'
              placeholder='Ingreso mensual'
              name='income'
              decimalScale={0}
              onValueChange={(values) => {handleIncomeChange(values.value, incomeIndex)}}
              required
            />
          </section>
        </div>
      </div>

      <div className={css.formContainer}>
        <section>
          <label id='contract' className={css.dropdownTitle}>De</label>
          <input 
            type='text'
            placeholder='De'
            className={`${css.styledInput} ${css.calendar}`}
          />
          {/* <label>
            <input type='date' name='fromDate' value={fromDate.format('YYYY-MM-DD')} onChange={e => handleDateChange(e, incomeIndex)} />
          </label> */}
        </section>
          
        <section>
          <label id='contract' className={css.dropdownTitle}>Hasta</label>
          <input
            type='text'
            placeholder='Hasta'
            className={`${css.styledInput} ${css.calendar}`}
          />
          {/* <label>
            <input type='date' name='toDate' value={toDate.format('YYYY-MM-DD')} onChange={e => handleDateChange(e, incomeIndex)} placeholder='Hola' />
          </label> */}
        </section>
      </div>

      {/* <button
        className={incomeIndex ? css.deleteButton: `${css.disabledButton} ${css.hideMobile}`}
        onClick={() => deleteIncomeSource(incomeIndex)}
        type='button'
        aria-label="Delete Income"
      >
        <DeleteIcon />
      </button> */}
    </form>
  );
};

export default FormIncome
