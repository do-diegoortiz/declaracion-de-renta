import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'
import DeductionInput from './deductionInput/deductionInput'
import { BlueButton, GreenButton } from '../buttons/buttons'
import Modal from '../modal/modal'

import css from './deductions.scss'

class Deductions extends Component {
  // https://www.youtube.com/watch?v=sHHbAlznq08
  // https://www.gerencie.com/deduccion-por-concepto-de-dependientes-en-el-impuesto-de-renta.html
  // Deducciones:
  // Dependientes (Hasta el 10% del ingreso bruto o hasta 384 UVT)
  // Medicina prepagada o Plan Complementario (Hasta 16UVT mensual)
  // Intereses de prestamos de vivienda
  // 50% del 4 x 1000
  // Aporte a cesantias hasta por 2500 UVT

  // Rentas exentas:
  // Cesatias e intereses de cesantias

  state = {
    openModal: false
  }

  componentDidMount = async() => {
    await this.props.liquidIncomeMinusDeductions()
    await this.props.totalTaxes()
  }

  openModal = () => {
    this.setState({openModal : true})
  }

  closeModal = () => {
    this.setState({openModal : false})
  }

  render() {
    const { prepaidMedicine, homeLoanInteres, dependants, donations, voluntaryContributions } = this.props.deduction
    const { totalTaxes, totalRetentions } = this.props.outcome
    const { uvt } = this.props.home

    return (
      <form className={css.formContainer}>
        <Modal
          show={this.state.openModal}
          modalClosed={this.closeModal}
        >
          <p className={css.modalText}>
            - Los dependientes sólo deben ser en primer grado (hijos, padres, hermanos, conyugüe), y no debieron haber tenido ingresos durante 2019 superiores a ${(260 * uvt).toLocaleString('en')}
          </p>
          <p className={css.modalText}>
            - Se puede agregar medicina prepagada o complementaria
          </p>
          <p className={css.modalText}>
            - Aportes a pensiones voluntarias, las pensiones obligadas no cuentan.
          </p>
          <p className={css.modalText}>
            - Intereses que hayas pagado por concepto de préstamo en crédito hipotecario.
          </p>
          <p className={css.modalText}>
            - Donaciones que te hayan certificado.
          </p>
        </Modal>
        <p className={css.mainTitle}>¡Oh! ¡Oh! Debes declarar</p>
        <p className={css.text}>Tus ingresos laborales de 2019 supera el umbral de ${(uvt * 1400).toLocaleString('en')}. Antes de que agreguemos las posibles deducciones, tu valor a pagar sería de: ${(totalTaxes-totalRetentions).toLocaleString('en')}.</p>
        <p className={css.text}>A continuación encuentras un listado de conceptos que pueden ayudarte a reducir el valir final a pagar. Para más info sobre esos conceptos, <span className={css.modal} onClick={this.openModal}>haz clic aquí</span>.</p>
        <p className={css.subTitle}>Deducciones 2019</p>
        <div className={css.formGroup}>
          <section>
            <label className={css.title}>Cant. Dependien</label>
            <select 
              name='dependants' 
              className={`${css.styledInput} ${css.caret} ${css.dependants}`}
              aria-labelledby='dependants' 
              onChange={this.props.handleDeductionChange}
              value={dependants}
              required
            >
              <option className={css.dependantOption} value='0'>0</option>
              <option className={css.dependantOption} value='1'>1</option>
              <option className={css.dependantOption} value='2'>2</option>
              <option className={css.dependantOption} value='3'>3</option>
            </select>
          </section>
          
          <div>
            {prepaidMedicine > 0 && (
              <label className={css.title}>Medicina Prepag</label>
            )}
            <section className={css.styledInput}>
              <DeductionInput
                id='prepaidMedicine'
                name='prepaidMedicine'
                onChange={this.props.handleDeductionChange}
                value={prepaidMedicine}
                placeholder={'Medicina prepagada'}
              />
            </section>
          </div>
        </div>

        <div className={css.formGroup}>
          <div>
            {voluntaryContributions > 0 && (
              <label className={css.title} htmlFor='voluntaryContributions'>Aportes voluntarios</label>
            )}
            <section className={css.styledInput}>
              <DeductionInput
                id='voluntaryContributions'
                name='voluntaryContributions'
                onChange={this.props.handleDeductionChange}
                value={voluntaryContributions}
                placeholder={'Aportes voluntarios'}
              />
            </section>
          </div>
          
          <div>
            {homeLoanInteres > 0 && (
              <label className={css.title} htmlFor='homeLoanInteres'>Int. Préstamo vivienda</label>
            )}
            <section className={css.styledInput}>
              <DeductionInput
                id='homeLoanInteres'
                name='homeLoanInteres'
                onChange={this.props.handleDeductionChange}
                value={homeLoanInteres}
                placeholder={'Int. Préstamo vivienda'}
              />
            </section>
          </div>
        </div>

        <div className={css.formGroup}>
          <div>
            {donations > 0 && (
              <label className={css.title} htmlFor='donations'>Donaciones</label>
            )}
            <section className={css.styledInput}>
              <DeductionInput
                id='donations'
                name='donations'
                onChange={this.props.handleDeductionChange}
                value={donations}
                placeholder={'Donaciones'}
              />
            </section>
          </div>
        </div>
        <section className={css.buttonContainer}>
          <GreenButton 
            label='👍 YA, RECALCULAR VALOR A PAGAR' 
            width='15rem' 
            minHeight='5.2rem' 
            fontSize='1.1rem' 
            onClick={() => this.props.handleView('summary')} 
          />
          <BlueButton 
            label='👎 NO TENGO DEDUCCIONES' 
            width='15rem' 
            minHeight='5.2rem' 
            fontSize='1.1rem' 
            onClick={() => this.props.handleView('summary')}
          />
        </section>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    home: state.home,
    outcome: state.outcome,
    deduction: state.deduction
  }
}

const mapDispatchToProps = dispatch => {
  return {
    liquidIncomeMinusDeductions: () => dispatch(actions.liquidIncomeMinusDeductions()),
    totalTaxes: () => dispatch(actions.totalTaxes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deductions)
