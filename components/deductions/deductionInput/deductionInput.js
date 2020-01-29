import React from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'

const DeductionInput = ({ id, name, onChange, value, placeholder }) => {
  DeductionInput.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
    placeholder: PropTypes.string.isRequired
  }

  let temporaryValue = 0

  return(
    <NumberFormat
      id={id}
      allowNegative={false}
      thousandSeparator={true}
      prefix='$'
      placeholder={placeholder}
      name={name}
      decimalScale={0}
      onValueChange={values => temporaryValue = values.value}
      onChange={e => onChange(e, temporaryValue)}
      value={value ? value : null}
    />
  )
}

export default DeductionInput
