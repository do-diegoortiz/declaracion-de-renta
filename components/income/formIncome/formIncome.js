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
      { !!incomeIndex && <hr className={css.separationLine} /> }
      <button
        className={incomeIndex ? css.deleteButton: `${css.disabledButton} ${css.hideMobile}`}
        onClick={() => deleteIncomeSource(incomeIndex)}
        type='button'
        aria-label="Delete Income"
      >
        <DeleteIcon />
      </button>
      <div className={css.formContainer}>
        {contract && (
          <label id='contract' className={css.title}>Tipo de empleo</label>
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
            <label id='contract' className={css.title}>Ingreso mensual</label>
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
          <label id='contract' htmlFor='fromDate' className={css.title}>De</label>
          <input 
            type='date'
            name='fromDate'
            className={`${css.styledInput} ${css.calendar}`}
            value={fromDate.format('YYYY-MM-DD')}
            onChange={e => handleDateChange(e, incomeIndex)}
            required
          />
        </section>
          
        <section>
          <label id='contract' htmlFor='toDate' className={css.title}>Hasta</label>
          <input
            type='date'
            name='toDate'
            className={`${css.styledInput} ${css.calendar}`}
            value={toDate.format('YYYY-MM-DD')}
            onChange={e => handleDateChange(e, incomeIndex)}
            required
          />
        </section>
      </div>
    </form>
  );
};

export default FormIncome
