import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format'

export const DeductionInput = ({ name, onChange }) => {
  DeductionInput.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  let temporaryValue = 0

  return(
    <NumberFormat
      thousandSeparator={true}
      prefix='$'
      placeholder='$0'
      name={name}
      decimalScale='0'
      onValueChange={values => temporaryValue = values.value}
      onChange={e => onChange(e, temporaryValue)}
    />
  )
}

export default DeductionInput