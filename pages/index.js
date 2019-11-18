import React from 'react'
import Head from 'next/head'
import Income from '../components/income/income'
import Deductions from '../components/deductions/deductions'
import Outcome from '../components/outcome/outcome'

import css from './index.scss'

const UVT = 33156

class Home extends React.Component {
  state = {
    summaryVisible: false,
    // INCOME
    incomeSources: [
      {
        income: 0,
        workedDays: 0,
        contract: 'nomina'
      }
    ],
    incomeOutOfTaxes: 0,

    // DEDUCTIONS
    prepaidMedicine: 0,
    indepSocialSecurity: 0,
    dependants: 0,
    donations: 0,
    voluntaryContributions: 0,
    totalDeductions: 0
  }

  increaseIncomeSources = () => {
    const sourcesCopy = [...this.state.incomeSources]
    sourcesCopy.push(
      {
        income: 0,
        workedDays: 0,
        contract: 'nomina'
      }
    )

    this.setState({incomeSources: sourcesCopy})
    this.showSummary
  }

  handleIncomeChange = (newIncome, index) => {
    if (newIncome) {
      const newValue = parseInt(newIncome, 0)

      const sourcesCopy = [...this.state.incomeSources]
      sourcesCopy[index].income = newValue

      this.setState({incomeSources: sourcesCopy})
    }
  }

  handleContractChange = (e, index) => {
    const sourcesCopy = [...this.state.incomeSources]
    sourcesCopy[index].contract = e.target.value

    this.setState({incomeSources: sourcesCopy})
  }

  handleWorkedDays = (days, index) => {
    const sourcesCopy = [...this.state.incomeSources]
    sourcesCopy[index].workedDays = days

    this.setState({incomeSources: sourcesCopy})
  }

  showSummary = e => {
    e.preventDefault()
    this.setState({ summaryVisible: true })

    let outOfTaxCopy = 0
    const incomeSources = [...this.state.incomeSources]

    for (let i = 0; i < incomeSources.length; i++) {
      if (incomeSources[i].contract === 'nomina') {
        // If income is below certain UVT's is not 9% but 8%. Because 1% of Solidaridad wouldn't be included
        outOfTaxCopy += incomeSources[i].income * (incomeSources[i].workedDays/30) * 0.09
      } else {
        // As independant you pay based on the 40% of your salary. 12.5% in health and 16% in retirement.
        outOfTaxCopy += incomeSources[i].income * (incomeSources[i].workedDays/30) * 0.4 * 0.285
      }
    }

    this.setState({ incomeOutOfTaxes: outOfTaxCopy })
  }

  // DEDUCTIONS
  handleDeductionChange = (e, newValue) => {
    if(e.target.name === 'dependants') {
      const totalIncome = this.state.incomeSources.map(x => x.income * (x.workedDays/30)).reduce((acum, current)=> acum + current)

      // Theory says you can substract 10% of your income for every dependant
      this.setState({dependants: e.target.value * totalIncome * 0.1})  
    } else {
      this.setState({[e.target.name]: parseInt(newValue)})
    }

    this.updateTotalDeductions()
  }

  updateTotalDeductions = () => {
    // TODO: This update is not getting the last updated values from handleDeductionChange
    this.setState({totalDeductions: this.state.prepaidMedicine
      + this.state.indepSocialSecurity
      + this.state.dependants
      + this.state.donations
      + this.state.voluntaryContributions
    })
  }

  render() {
    const {
      summaryVisible, incomeSources, incomeOutOfTaxes, //INCOME
      prepaidMedicine, indepSocialSecurity, dependants, donations, voluntaryContributions, totalDeductions //DEDUCTIONS
    } = this.state

    const totalIncome = incomeSources.map(x => x.income * (x.workedDays/30)).reduce((acum, current)=> acum + current)

    return (
      <div>
        <Head>
          <title>Inicio</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <h1 className={css.title}>Optimiza la declaración de renta</h1>
        <p className={css.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <h2 className={css.formTitle}>
          Ingresos
        </h2>

        <Income
          handleIncomeChange={this.handleIncomeChange}
          handleContractChange={this.handleContractChange}
          handleWorkedDays={this.handleWorkedDays}
          showSummary={this.showSummary}
          increaseIncomeSources={this.increaseIncomeSources}
          summaryVisible={summaryVisible}
          incomeSources={incomeSources}
          incomeOutOfTaxes={incomeOutOfTaxes}
        />

        <h2 className={css.formTitle}>
          Deducciones
        </h2>
        <p className={css.description}>
          Escriba en cada casilla el valor total que esperar pagar en el año.
        </p>

        <Deductions
          handleDeductionChange={this.handleDeductionChange}
          prepaidMedicine={prepaidMedicine}
          indepSocialSecurity={indepSocialSecurity}
          dependants={dependants}
          donations={donations}
          voluntaryContributions={voluntaryContributions}
        />

        <Outcome
          liquidIncome={totalIncome - incomeOutOfTaxes}
          totalDeductions={totalDeductions}
        />

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

export default Home
