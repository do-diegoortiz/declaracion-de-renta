import React from 'react';
import PropTypes from 'prop-types';
import DeductionInput from '../../deductions/deductionInput/deductionInput'

import css from './formLayoff.scss';

export const FormLayoff = ({ handleLayoffChange, layoffsLastYear }) => {
  FormLayoff.propTypes = {
    handleLayoffChange: PropTypes.func.isRequired,
    layoffsLastYear: PropTypes.number.isRequired
  };

  return <div className={css.inputContainer}>
    <label className={css.inputTitle} htmlFor='layoff'>
      Cesantias 2018: &nbsp;
      <span className={css.inputContent}>
        <DeductionInput
          id='layoff'
          name='layoff'
          onChange={handleLayoffChange}
          value={layoffsLastYear}
        />
      </span> 
    </label>
  </ div>
}

export default FormLayoff
