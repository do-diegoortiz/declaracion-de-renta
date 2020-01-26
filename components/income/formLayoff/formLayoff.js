import React from 'react'
import PropTypes from 'prop-types'
import DeductionInput from '../../deductions/deductionInput/deductionInput'
import { BlueButton, GreenButton } from '../../buttons/buttons'

import css from './formLayoff.scss'

const FormLayoff = ({ handleLayoffChange, layoffsLastYear, handleView, emptyLayoff, handleLayoff }) => {
  FormLayoff.propTypes = {
    handleLayoffChange: PropTypes.func.isRequired,
    layoffsLastYear: PropTypes.number.isRequired,
    handleView: PropTypes.func.isRequired,
    emptyLayoff: PropTypes.bool.isRequired,
    handleLayoff: PropTypes.func.isRequired
  };

  return (
    <div className={css.inputContainer}>
      <p className={css.text}>
        Si sabes el valor exacto o aproximado de las cesantías que te consignaron en febrero de 2019, nos ayudará a estimar mejor el valor a pagar en la declaración de renta.
      </p>
      <p className={css.text}>
        Este valor se puede consultar en la plataforma de tu fondo de pensiones. Empresas como Porvenir, Protección, Old Mutual, etc. tienen esa información lista para ti.
      </p>
      <p className={css.text}>
        Además si vas a declarar te conviene tener a la mano el certificado de 2019.
      </p>
      <label className={css.inputTitle} htmlFor='layoff'>
        Cesantías
      </label>
      <div className={css.inputContent}>
        {layoffsLastYear > 0 && (
          <label className={css.title}>Total Cesantías</label>
        )}
        <DeductionInput
          id='layoff'
          name='layoff'
          onChange={handleLayoffChange}
          value={layoffsLastYear}
        />
        {emptyLayoff && (
          <div className={css.emptyLayoff}>No llenaste este campo</div>
        )}
      </div>
      <section className={css.buttons}>
        <GreenButton label='👍 LISTO, HACER CALCULOS YA' width='15rem' minHeight='5.2rem' fontSize='1.2rem' onClick={handleLayoff} />
        <BlueButton label='CALCULAR SIN USAR ESTE VALOR' width='15rem' minHeight='5.2rem' fontSize='1.2rem' onClick={() => handleView('addDeductions')} />
      </section>
    </div>
  )
}

export default FormLayoff
