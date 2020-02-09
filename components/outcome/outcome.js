import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'

import css from './outcome.scss'

class Outcome extends Component {
  componentDidMount = async() => {
    await this.props.totalRetentions()
    await this.props.liquidIncomeMinusDeductions()
    await this.props.totalTaxes()
    await this.props.deductionsOnTheLimit()
    await this.props.maxValueToAddInDeductions()
    await this.props.savingsWithAdviceInVoluntaryRetirementContributions()
  }
  
  render () {
    const {
      totalRetentions,
      liquidIncomeMinusDeductions,
      totalTaxes,
      deductionsOnTheLimit,
      savingsForOneMonthOfPrepaidMedicine,
      maxValueToAddInDeductions,
      savingsWithAdviceInVoluntaryRetirementContributions
    } = this.props.outcome

    const {
      handleRetentionChange,
      liquidIncome,
      totalDeductions,
      prepaidMedicine,
      incomeSources
    } = this.props

    const retentions = incomeSources.map((income, i) => {
      return income.retention > 0 ? <h2 className={css.SubTotalContainer} key={i}>
        <span className={css.Title}>Rte.Fte Trabajo #{i+1}</span>
        <span className={css.TotalNumber}>
          <NumberFormat
            value={income.retention}
            thousandSeparator={true}
            prefix='$'
            decimalScale={0}
            onValueChange={(values) => {handleRetentionChange(values.value, i)}}
          />
        </span>
      </h2> : null
    })

    return (
      <div className={css.SummaryContainer} key={liquidIncome}>
        <div className={css.container}>
          <h2 className={css.formTitle}>
            Listo
          </h2>
          <p className={css.description}>
            El valor de retención en la fuente varía en cada empresa, nosotros hacemos el cálculo con un valor promedio, pero ese valor puede ser diferente para tí.
          </p>
          <h2 className={css.SubTotalContainer}>
            <span className={css.Title}>ℹ️Renta Líquida</span>
            <span className={css.TotalNumber}>
              <NumberFormat
                value={liquidIncome}
                thousandSeparator={true}
                prefix='$'
                decimalScale={0}
              />
            </span>
          </h2>

          <h2 className={css.SubTotalContainer}>
            <span className={css.Title}>Deducciones Totales</span>
            <span className={css.TotalNumber}>
              <NumberFormat
                value={totalDeductions + (liquidIncome - totalDeductions) * 0.25}
                thousandSeparator={true}
                prefix='$'
                decimalScale={0}
              />
            </span>
          </h2>

          <hr className={css.separationLine} />

          <h2 className={css.SubTotalContainer}>
            {/* Renta liquida menos total de deducciones (Que no deben exeder el 40%) */}
            <span className={`${css.Title} ${css.total}`}>Renta líquida cedular de trabajo</span>
            <span className={`${css.TotalNumber} ${css.total}`}>
              <NumberFormat
                value={liquidIncomeMinusDeductions}
                thousandSeparator={true}
                prefix='$'
                decimalScale={0}
              />
            </span>
          </h2>

          <h2 className={css.SubTotalContainer}>
            {/* Renta liquida, menos UVT del grupo, por el % del grupo */}
            <span className={css.Title}>Total Impuesto</span>
            <span className={css.TotalNumber}>
              <NumberFormat
                value={totalTaxes}
                thousandSeparator={true}
                prefix='$'
                decimalScale={0}
              />
            </span>
          </h2>

          {retentions}

          <h2 className={css.SubTotalContainer}>
            {/* Renta liquida, menos UVT del grupo, por el % del grupo */}
            <span className={css.Title}>{(totalTaxes - totalRetentions) >= 0 ? 'Valor a pagar:' : 'La DIAN te debe'}</span>
            <span className={(totalTaxes - totalRetentions) >= 0 ? css.TotalBadNumber : css.TotalGoodNumber}>
              <NumberFormat
                value={totalTaxes > totalRetentions ? totalTaxes - totalRetentions : totalRetentions - totalTaxes}
                thousandSeparator={true}
                prefix='$'
                decimalScale={0}
              />
            </span>
          </h2>

          {/* <br/>
          {totalRetentions ? 'Si el valor en "Rte.Fte Trabajo" no corresponde a la realidad y tú conoces el real, puedes editar ese número' : null} */}
        </div>

        {/* {totalTaxes ? <aside className={css.Advice}>
          <h3>El valor de retención en la fuente varía en cada empresa, nosotros hacemos el calculo con un valor promedio pero ese valor puede ser diferente para ti.</h3>
          {
            deductionsOnTheLimit ? <h3> Hiciste un gran trabajo este año. Pagarás lo mínimo posible </h3> :
              <ol>
                <p>Estos son algunos consejos que puedes seguir:</p>
                {prepaidMedicine ? null : <li>Este año ya no alcanzas, pero te conviene afiliarte a medicina prepagada. Además de tener mejor servicio de salud, con un plan de $500.000 mensual te ahorrarías <b>$ {savingsForOneMonthOfPrepaidMedicine}</b> por mes en el pago de renta</li>}

                <li>Puedes afiliarte a un fondo de pensiones voluntarias y aportar hasta 
                  <span className={css.AdviceValues}>
                    <NumberFormat
                      value={maxValueToAddInDeductions}
                      thousandSeparator={true}
                      prefix=' $'
                      decimalScale={0}
                    />
                  </span>
                  que dejarían tu valor a pagar de renta en el mínimo posible y te ahorrarias 
                  <span className={css.AdviceValues}>
                    <NumberFormat
                      value={savingsWithAdviceInVoluntaryRetirementContributions}
                      thousandSeparator={true}
                      prefix=' $'
                      decimalScale={0}
                    />
                  </span>
                </li>
                <li>Diciembre es un buen mes para donar. El valor de renta baja poco (<b>$ {savingsForOneMonthOfPrepaidMedicine}</b> por cada $500.000 COP), pero la ciencia dice que ayudar te hará sentir feliz. Eres parte del {incomeSources[0].income > 9000000 ? 1 : 2}% mejor remunerado en Colombia y a pesar de que la corrupción es alta... es un país en dónde se paga un % de impuestos bajo.</li>
              </ol>
          }
        </aside> : null} */}
      </ div>
    )
  }
}

const mapStateToProps = state => {
  return {
    outcome: state.outcome
  }
}

const mapDispatchToProps = dispatch => {
  return {
    totalRetentions: () => dispatch(actions.totalRetentions()),
    liquidIncomeMinusDeductions: () => dispatch(actions.liquidIncomeMinusDeductions()),
    totalTaxes: () => dispatch(actions.totalTaxes()),
    deductionsOnTheLimit: () => dispatch(actions.deductionsOnTheLimit()),
    maxValueToAddInDeductions: () => dispatch(actions.maxValueToAddInDeductions()),
    savingsWithAdviceInVoluntaryRetirementContributions: () => dispatch(actions.savingsWithAdviceInVoluntaryRetirementContributions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Outcome)
