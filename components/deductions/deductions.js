import React from 'react'
import DeductionInput from './deductionInput/deductionInput'

import css from './deductions.scss'

class Deductions extends React.Component {
  // https://www.youtube.com/watch?v=sHHbAlznq08
  // Deducciones:
  // Dependientes (Hasta el 10% del ingreso bruto o hasta 384 UVT)
  // Medicina prepagada o Plan Complementario (Hasta 16UVT mensual)
  // Intereses de prestamos de vivienda
  // 50% del 4 x 1000
  // Aporte a cesantias hasta por 2500 UVT

  // Rentas exentas:
  // Cesatias e intereses de cesantias
  render() {
    const {prepaidMedicine, indepSocialSecurity, dependants, donations, voluntaryContributions, totalIncome} = this.props

    return <form className={css.formContainer}>
      <div className={css.formGroup}>
        <label className={css.label}>Medicina Prepagada</label>
        <DeductionInput
          name='prepaidMedicine'
          onChange={this.props.handleDeductionChange}
          value={prepaidMedicine}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Aportes Como Ind. a SS</label>
        <DeductionInput
          name='indepSocialSecurity'
          onChange={this.props.handleDeductionChange}
          value={indepSocialSecurity}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Cantidad Dependientes</label>
        <input type="number" name='dependants' onChange={this.props.handleDeductionChange} value={dependants / 0.1 / (totalIncome || 1)} />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Donaciones</label>
        <DeductionInput
          name='donations'
          onChange={this.props.handleDeductionChange}
          value={donations}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label}>Aportes a Pens Voluntar.</label>
        <DeductionInput
          name='voluntaryContributions'
          onChange={this.props.handleDeductionChange}
          value={voluntaryContributions}
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