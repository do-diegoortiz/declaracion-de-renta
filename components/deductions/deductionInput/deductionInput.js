import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format'

export const DeductionInput = ({ id, name, onChange, value }) => {
  DeductionInput.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired
  }

  let temporaryValue = 0

  return(
    <NumberFormat
      id={id}
      allowNegative={false}
      thousandSeparator={true}
      prefix='$'
      placeholder='$0'
      name={name}
      decimalScale={0}
      onValueChange={values => temporaryValue = values.value}
      onChange={e => onChange(e, temporaryValue)}
      value={value ? value : null}
    />
  )
}

export default DeductionInput