import React, { Component } from 'react'
import DeductionInput from './deductionInput/deductionInput'
import { BlueButton, GreenButton } from '../buttons/buttons'
import Modal from '../modal/modal'

import css from './deductions.scss'

class Deductions extends Component {
  // https://www.youtube.com/watch?v=sHHbAlznq08
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

  openModal = () => {
    this.setState({openModal : true})
  }

  closeModal = () => {
    this.setState({openModal : false})
  }

  render() {
    const {prepaidMedicine, homeLoanInteres, dependants, donations, voluntaryContributions} = this.props

    return (
      <form className={css.formContainer}>
        <Modal
          show={this.state.openModal}
          modalClosed={this.closeModal}
        >
          <p className={css.modalText}>
            - Los dependientes sólo deben ser en primer grado (hijos, padres, hermanos, conyugüe), y no debieron haber tenido ingresos durante 2019 superiores a $x'000.000
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
        <p className={css.text}>Tus ingresos laborales de 2019 supera el umbral de $47'978.000. Antes de que agreguemos las posibles deducciones, tu valor a pagar sería de: $1'012.166.</p>
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
              <option className={css.dependantOption} value='0' disabled>Cantidad dependientes</option>
              <option className={css.dependantOption} value='1'>1</option>
              <option className={css.dependantOption} value='2'>2</option>
              <option className={css.dependantOption} value='3'>3</option>
            </select>
          </section>
          
          <div>
            <label className={css.title}>Medicina Prepag</label>
            <section className={css.styledInput}>
              <DeductionInput
                id='prepaidMedicine'
                name='prepaidMedicine'
                onChange={this.props.handleDeductionChange}
                value={prepaidMedicine}
              />
            </section>
          </div>
        </div>

        <div className={css.formGroup}>
          <div>
            <label className={css.title} htmlFor='voluntaryContributions'>Aportes voluntarios</label>
            <section className={css.styledInput}>
              <DeductionInput
                id='voluntaryContributions'
                name='voluntaryContributions'
                onChange={this.props.handleDeductionChange}
                value={voluntaryContributions}
              />
            </section>
          </div>
          
          <div>
            <label className={css.title} htmlFor='homeLoanInteres'>Int. Préstamo vivienda</label>
            <section className={css.styledInput}>
              <DeductionInput
                id='homeLoanInteres'
                name='homeLoanInteres'
                onChange={this.props.handleDeductionChange}
                value={homeLoanInteres}
              />
            </section>
          </div>
        </div>

        <div className={css.formGroup}>
          <div>
            <label className={css.title} htmlFor='donations'>Donaciones</label>
            <section className={css.styledInput}>
              <DeductionInput
                id='donations'
                name='donations'
                onChange={this.props.handleDeductionChange}
                value={donations}
              />
            </section>
          </div>
        </div>
        <section className={css.buttonContainer}>
          <GreenButton 
            label='👍 YA, RECALCULAR VALOR A PAGAR' 
            width='15.3rem' 
            minHeight='5.2rem' 
            fontSize='1.2rem' 
            onClick={() => handleView('summary')} 
          />
          <BlueButton 
            label='👎 NO TENGO DEDUCCIONES' 
            width='15.3rem' 
            minHeight='5.2rem' 
            fontSize='1.2rem' 
            onClick={() => handleView('summary')}
          />
        </section>
      </form>
    )
  }
}

export default Deductions
