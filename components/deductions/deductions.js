import React from 'react'
import NumberFormat from 'react-number-format'

import css from './deductions.scss'

class Deductions extends React.Component {
  state = {

  }

  handleDeductionChange(value) {
    console.log(value)
  }

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
          onValueChange={(values) => {this.handleDeductionChange(values.value)}}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Aportes Como Ind. a SS</label>
        <NumberFormat
          thousandSeparator={true}
          prefix='$'
          placeholder='$0'
          name='prepaidMedicine'
          decimalScale='0'
          onValueChange={(values) => {this.handleDeductionChange(values.value)}}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Dependientes</label>
        <NumberFormat
          thousandSeparator={true}
          prefix='$'
          placeholder='$0'
          name='prepaidMedicine'
          decimalScale='0'
          onValueChange={(values) => {this.handleDeductionChange(values.value)}}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Donaciones</label>
        <NumberFormat
          thousandSeparator={true}
          prefix='$'
          placeholder='$0'
          name='prepaidMedicine'
          decimalScale='0'
          onValueChange={(values) => {this.handleDeductionChange(values.value)}}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Aportes a Pens Voluntar.</label>
        <NumberFormat
          thousandSeparator={true}
          prefix='$'
          placeholder='$0'
          name='prepaidMedicine'
          decimalScale='0'
          onValueChange={(values) => {this.handleDeductionChange(values.value)}}
        />
      </div>

      {/* <h1>Aportes voluntarios a fondos de pensiones y retiro de cesantías</h1>
      <li>Certificado de aportes y Retenciones de pensiones voluntarias Individual 2018 #1</li>
      <li>Certificado tributario de cesantías año actual</li>
      <li>Certificado tributario de cesantías año anterior</li>

      <h1>Deducciones</h1>
      <li>Medicina prepagada</li>
      <li>Aportes como independiente a seguridad social</li>
      <li>Dependientes</li>
      <li>Donaciones</li> */}
    </form>
  }
}

export default Deductions