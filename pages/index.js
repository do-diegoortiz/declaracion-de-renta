import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../store/actions/index'
import Income from '../components/income/income'
import Deductions from '../components/deductions/deductions'
import Outcome from '../components/outcome/outcome'
import MobileHeader from '../components/header/mobileHeader/mobileHeader'
import Introduction from '../components/header/introduction/introduction'
import Footer from '../components/footer/footer'

import css from './index.scss'

class Home extends React.Component {
  render() {
    const { hasToDeclare, summaryVisible, deductionsVisible } = this.props.home
    const { incomeSources, totalIncome, incomeOutOfTaxes, layoffsLastYear } = this.props.income
    const {
      prepaidMedicine, indepSocialSecurity, homeLoanInteres, dependants, donations, voluntaryContributions, totalDeductions
    } = this.props.deduction
    const { 
      showDeductions, increaseIncomeSources, showSummary, deleteIncomeSource, handleIncomeChange, 
      updateTotalIncome, handleContractChange, handleWorkedDays, handleDeductionChange, handleRetentionChange,
      handleLayoffChange
    } = this.props

    return (
      <div>
        <MobileHeader />
        <Introduction />

        <h2 className={css.formTitle}>
          Ingresos
        </h2>

        <p className={css.description}>
          Si sabes el valor exacto o aproximado de las cesantías que te pudieron haber consignado en febrero de este año, ingresalo en el primer campo. Si no es tu caso, llena solo la sección de ingresos laborales de 2019
        </p>

        <Income
          handleIncomeChange={handleIncomeChange}
          handleContractChange={handleContractChange}
          handleWorkedDays={handleWorkedDays}
          handleLayoffChange={handleLayoffChange}
          updateTotalIncome={updateTotalIncome}
          showSummary={showSummary}
          showDeductions={showDeductions}
          increaseIncomeSources={increaseIncomeSources}
          deleteIncomeSource={deleteIncomeSource}
          summaryVisible={summaryVisible}
          hasToDeclare={hasToDeclare}
          incomeSources={incomeSources}
          incomeOutOfTaxes={incomeOutOfTaxes}
          layoffsLastYear={layoffsLastYear}
          totalIncome={totalIncome}
        />

        {
          deductionsVisible && hasToDeclare && <div className={css.hasToDeclareGroup}>
            <section className={css.deductionsForm}>
              <h2 className={css.formTitle}>
                Deducciones
              </h2>

              <p className={css.description}>
                Escribe la cantidad de dependientes y en las demás casillas el valor total que espera pagar en el año.
              </p>

              <Deductions
                handleDeductionChange={handleDeductionChange}
                prepaidMedicine={prepaidMedicine}
                indepSocialSecurity={indepSocialSecurity}
                homeLoanInteres={homeLoanInteres}
                dependants={dependants}
                donations={donations}
                voluntaryContributions={voluntaryContributions}
                totalIncome={totalIncome}
              />
            </section>

            <Outcome
              handleRetentionChange={handleRetentionChange}
              liquidIncome={totalIncome - incomeOutOfTaxes}
              totalDeductions={totalDeductions}
              prepaidMedicine={prepaidMedicine}
              incomeSources={incomeSources}
            />
          </div>
        }

        <Footer />

        {/* <ul>
          <h1>Info personal</h1>
          <li>Información reportada por terceros</li>
          <li>Formulario del año anterior</li>

          <h1>Productos financieros</h1>
          <li>Certificado anual de retención en la fuente de cada banco</li>
          <li>
            <h3>Productos no bancarios</h3>
            <ul>
              <li>Comisionistas de bolsa</li>
              <li>Acciones de sociedades privadas</li>
              <li>Cooperativas de ahorro y compañias de financiamiento</li>
              <li>Criptomonedas</li>
              <li>Prástamos a terceros</li>
              <li>Efectivo</li>
            </ul>
          </li>
          <li>
            <h3>Deudas no bancarias</h3>
            <ul>
              <li>Créditos educativos</li>
              <li>Deudas con terceros</li>
            </ul>
          </li>

          <h1>Bienes</h1>
          <li>
            <h3>Bienes Personales</h3>
            <ul>
              <li>Vehiculos personales</li>
              <li>Bienes raices</li>
              <li>Bienes raices sobre planos</li>
              <li>Otros bienes o articulos personales</li>
            </ul>
          </li>
          <li>
            <h3>Bienes De Tu Negocio Personal</h3>
            <ul>
              <li>Maquinas o bienes de uso comercial</li>
              <li>Inventarios</li>
              <li>Bienes raices para desarrollo del negocio</li>
            </ul>
          </li>


          <h1>Ingresos</h1>
          <li>
            <h3>Ingresos laborales o pensionales</h3>
            <ul>
              <li>Salario (Certificado ingresos y retenciones de cada trabajo)</li>
              <li>Honorarios, servicios o comisiones como independiente (Cta cobro o cert+retenciones e Información de Gastos)</li>
              <li>Negocio propio</li>
              <li>Pensiones de jubilación</li>
            </ul>
          </li>
          <li>
            <h3>Ingresos por arrendamientos</h3>
            <ul>
              <li>Arrendamiento de bienes raices</li>
              <li>Arrendamiento de vehículos</li>
              <li>Arrendamiento de maquinaria</li>
              <li>Arrendamiento de otros bienes</li>
            </ul>
          </li>
          <li>
            <h3>Ingresos por venta de bienes</h3>
            <ul>
              <li>Venta de vehículo</li>
              <li>Venta de bienes raices incluyendo lote</li>
              <li>Venta de acciones o participaciones en sociedades</li>
              <li>
                Venta de otros bienes
                <ul>
                  <li>(e.g. venta de computador a LEC y su rte/fte, con fecha aproximada)</li>
                  <li>(e.g. compra del mismo)</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <h3>Ingresos ocasionales</h3>
            <ul>
              <li>Herencia, legado o donación</li>
              <li>Liquidación sociedad conyugal</li>
              <li>Indemnisaciones y subsidios estatales</li>
              <li>Seguros</li>
              <li>Premios y loterias</li>
              <li>Donaciones para partidos politicos</li>
            </ul>
          </li>

          <h1>Aportes voluntarios a fondos de pensiones y retiro de cesantías</h1>
          <li>Certificado de aportes y Retenciones de pensiones voluntarias Individual 2018 #1</li>
          <li>Certificado tributario de cesantías año actual</li>
          <li>Certificado tributario de cesantías año anterior</li>

          <h1>Deducciones</h1>
          <li>Medicina prepagada</li>
          <li>Aportes como independiente a seguridad social</li>
          <li>Dependientes</li>
          <li>Donaciones</li>
        </ul> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    home: state.home,
    income: state.income,
    deduction: state.deduction
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showSummary: e => dispatch(actions.showSummary(e)),
    showDeductions: e => dispatch(actions.showDeductions(e)),
    increaseIncomeSources: (...args) => dispatch(actions.increaseIncomeSources(...args)),
    deleteIncomeSource: (index) => dispatch(actions.deleteIncomeSource(index)),
    handleIncomeChange: (newIncome, index) => dispatch(actions.handleIncomeChange(newIncome, index)),
    updateTotalIncome: (layoffLastYear) => dispatch(actions.updateTotalIncome(layoffLastYear)),
    handleContractChange: (e, index) => dispatch(actions.handleContractChange(e, index)),
    handleWorkedDays: (days, index, stillThere) => dispatch(actions.handleWorkedDays(days, index, stillThere)),
    handleDeductionChange: (e, newValue) => dispatch(actions.handleDeductionChange(e, newValue)),
    handleRetentionChange: (newRetention, index) => dispatch(actions.handleRetentionChange(newRetention, index)),
    handleLayoffChange: (e, newValue) => dispatch(actions.handleLayoffChange(e, newValue))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)
