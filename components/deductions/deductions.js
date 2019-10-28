import React from 'react'
import DeductionInput from './deductionInput/deductionInput'

import css from './deductions.scss'

class Deductions extends React.Component {
  render() {
    return <form className={css.formContainer}>
      <div className={css.formGroup}>
        <label className={css.label}>Medicina Prepagada</label>
        <DeductionInput
          name='prepaidMedicine'
          onChange={this.props.handleDeductionChange}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Aportes Como Ind. a SS</label>
        <DeductionInput
          name='indepSocialSecurity'
          onChange={this.props.handleDeductionChange}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Dependientes</label>
        <DeductionInput
          name='dependants'
          onChange={this.props.handleDeductionChange}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Donaciones</label>
        <DeductionInput
          name='donations'
          onChange={this.props.handleDeductionChange}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Aportes a Pens Voluntar.</label>
        <DeductionInput
          name='voluntaryContributions'
          onChange={this.props.handleDeductionChange}
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