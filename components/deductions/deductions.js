import React from 'react'
import NumberFormat from 'react-number-format'

import css from './deductions.scss'

class Deductions extends React.Component {
  render() {
    return <form className={css.formContainer}>
      <div className={css.formGroup}>
        <label className={css.label}>Medicina Prepagada</label>
        <NumberFormat
          thousandSeparator={true}
          prefix='$'
          placeholder='$0'
          name='prepaidMedicine'
          decimalScale='0'
          onChange={(e) => {this.props.handleDeductionChange(e)}}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Aportes Como Ind. a SS</label>
        <NumberFormat
          thousandSeparator={true}
          prefix='$'
          placeholder='$0'
          name='indepSocialSecurity'
          decimalScale='0'
          onChange={(e) => {this.props.handleDeductionChange(e)}}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Dependientes</label>
        <NumberFormat
          thousandSeparator={true}
          prefix='$'
          placeholder='$0 (2M/ Cabeza)'
          name='dependants'
          decimalScale='0'
          onChange={(e) => {this.props.handleDeductionChange(e)}}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Donaciones</label>
        <NumberFormat
          thousandSeparator={true}
          prefix='$'
          placeholder='$0'
          name='donations'
          decimalScale='0'
          onChange={(e) => {this.props.handleDeductionChange(e)}}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Aportes a Pens Voluntar.</label>
        <NumberFormat
          thousandSeparator={true}
          prefix='$'
          placeholder='$0'
          name='voluntaryContributions'
          decimalScale='0'
          onChange={(e) => {this.props.handleDeductionChange(e)}}
        />
      </div>

      {/* <h1>Aportes voluntarios a fondos de pensiones y retiro de cesantías</h1>
      <li>Certificado de aportes y Retenciones de pensiones voluntarias Individual 2018 #1</li>
      <li>Certificado tributario de cesantías año actual</li>
      <li>Certificado tributario de cesantías año anterior</li> */}
    </form>
  }
}

export default Deductions