import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format'

import css from './outcome.scss';

export const Outcome = ({ liquidIncome, totalDeductions }) => {
  Outcome.propTypes = {
    liquidIncome: PropTypes.number.isRequired,
    totalDeductions: PropTypes.number.isRequired,
  };

  return <div className={css.SummaryContainer} key={liquidIncome}>
    <h2>
      Renta Líquida:
      <span className={css.TotalBadNumber}>
        <NumberFormat
          value={liquidIncome}
          thousandSeparator={true}
          prefix='$'
          decimalScale='0'
        />
      </span>
    </h2>
    <h2>
      Deducciones Totales:
      <span className={css.TotalNumber}>
        <NumberFormat
          value={totalDeductions + (liquidIncome - totalDeductions) * 0.25}
          thousandSeparator={true}
          prefix='$'
          decimalScale='0'
        />
      </span>
    </h2>

    <h2>
      {/* Renta liquida menos total de deducciones (Que no deben exeder el 40%) */}
      Renta Líquida Cedular de Trabajo:
      <span className={css.TotalBadNumber}>
        <NumberFormat
          value={liquidIncome - totalDeductions - ((liquidIncome - totalDeductions) * 0.25)}
          thousandSeparator={true}
          prefix='$'
          decimalScale='0'
        />
      </span>
    </h2>

    <h2>
      {/* Renta liquida, menos UVT del grupo, por el % del grupo */}
      Valor de renta a pagar:
      <span className={css.TotalBadNumber}>
        <NumberFormat
          value={(liquidIncome - ((liquidIncome - totalDeductions) * 0.25)) * 0.28}
          thousandSeparator={true}
          prefix='$'
          decimalScale='0'
        />
      </span>
    </h2>
    {/* <h3 style={{'color': 'red'}}>
      Valor a consignar en pensiones voluntarias:
      <NumberFormat
        // MEJORAR FORMULA PARA NO RESTAR TODO, SINO SOLO CUANDO PASE DEL 5%
        value={(income / 30 * totalDays ) > (UVT * 1090) ? (((income / 30) * totalDays * 0.1) - prepaidMedicine - indepSocialSecurity - dependants - donations - voluntaryContributions) : 0 }
        thousandSeparator={true}
        prefix='$'
        decimalScale='0'
      />
    </h3> */}

  </ div>
}

export default Outcome
