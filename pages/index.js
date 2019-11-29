import React from 'react'
import Income from '../components/income/income'
import Deductions from '../components/deductions/deductions'
import Outcome from '../components/outcome/outcome'

import css from './index.scss'

const UVT = 34270

class Home extends React.Component {
  state = {
    summaryVisible: false,
    // INCOME
    incomeSources: [
      {
        income: 0,
        retention: 0,
        workedDays: 365,
        contract: 'nomina' // The other two options are 'prestaciones' and 'contratista'
      }
    ],
    incomeOutOfTaxes: 0,

    // DEDUCTIONS
    prepaidMedicine: 0,
    indepSocialSecurity: 0,
    dependants: 0, // Number of people
    dependantsDeduction: 0,
    donations: 0,
    voluntaryContributions: 0,
    totalDeductions: 0
  }

  increaseIncomeSources = (...args) => {
    const [defaultWorkedDays] = args
    const sourcesCopy = [...this.state.incomeSources]

    sourcesCopy.push(
      {
        income: 0,
        retention: 0,
        workedDays: defaultWorkedDays,
        contract: 'nomina'
      }
    )

    this.setState({incomeSources: sourcesCopy})
    this.showSummary
  }

  deleteIncomeSource = (index) => {
    const sourcesCopy = [...this.state.incomeSources]
    sourcesCopy.splice(index, 1)
    
    this.setState({incomeSources: sourcesCopy})
  }

  handleIncomeChange = (newIncome, index) => {
    if (newIncome) {
      const newValue = parseInt(newIncome, 0)

      const sourcesCopy = [...this.state.incomeSources]
      sourcesCopy[index].income = newValue

      this.setState({incomeSources: sourcesCopy})

      if(sourcesCopy.length === 1 && newValue === 0) {
        this.setState({summaryVisible: false})
      }

      this.updateRetention(index, newValue, sourcesCopy[index].contract)
    }
  }

  handleContractChange = (e, index) => {
    const sourcesCopy = [...this.state.incomeSources]
    sourcesCopy[index].contract = e.target.value

    this.setState({incomeSources: sourcesCopy})
    this.updateRetention(index, sourcesCopy[index].income, e.target.value)
  }

  updateRetention = (index, income, contract) => {
    const sourcesCopy = [...this.state.incomeSources]
    const totalSalary = (income / 30) * sourcesCopy[index].workedDays;

    if (contract === 'nomina') {
      // Table to calculate properly this value is here: https://www.gerencie.com/retencion-en-la-fuente-por-ingresos-laborales.html
      // Here we are using 19% since is the most common
      sourcesCopy[index].retention = income > 4770183 ? ((income - 87 * UVT) * 0.19) : 0
    } else if(contract === 'prestaciones') {
      // I've read we had to add 1% about ICA in certain scenarios
      // TODO: Verify is its 11% before paying health+retirement or over the base salary
      sourcesCopy[index].retention = income > 828116 ? (totalSalary * 0.6) * 0.11 : totalSalary * 0.11
    }

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
    let totalDeductions = 0
    const totalIncome = this.state.incomeSources.map(x => x.income * (x.workedDays/30)).reduce((acum, current)=> acum + current)
    const liquidIncome = totalIncome - this.state.incomeOutOfTaxes

    if (e.target.name === 'dependants') {
      totalDeductions = this.getTotalDeductionsDependants(e.target.value * totalIncome * 0.1)
      const deductionsOverTheLimit = totalDeductions + ((liquidIncome - totalDeductions) * 0.25) > (liquidIncome * 0.4)

      if (deductionsOverTheLimit) {
        alert("Lo sentimos, las deducciones no pueden exceder el 40% del ingreso liquido")
      } else {
        // Theory says you can substract 10% of your income for every dependant
        this.setState({
          dependantsDeduction: e.target.value * totalIncome * 0.1,
          dependants: e.target.value,
          totalDeductions: totalDeductions
        })  
      }
    } else {
      totalDeductions = this.getTotalDeductionsStandard(e.target.name, parseInt(newValue))
      const deductionsOverTheLimit = totalDeductions + ((liquidIncome - totalDeductions) * 0.25) > (liquidIncome * 0.4)

      if (deductionsOverTheLimit) {
        alert("Lo sentimos, las deducciones no pueden exceder el 40% del ingreso liquido")
        this.setState({[e.target.name]: this.state[e.target.name]})
      } else {
        this.setState({
          [e.target.name]: parseInt(newValue),
          totalDeductions: totalDeductions
        })
      }
    }
  }

  handleRetentionChange  = (newRetention, index) => {
    if (newRetention) {
      const newValue = parseInt(newRetention)
      const sourcesCopy = [...this.state.incomeSources]
      sourcesCopy[index].retention = newValue

      this.setState({incomeSources: sourcesCopy})
    }
  }

  getTotalDeductionsDependants(value) {
    return this.state.prepaidMedicine
      + this.state.indepSocialSecurity
      + value
      + this.state.donations
      + this.state.voluntaryContributions
  }

  getTotalDeductionsStandard(deduction, value) {
    const deductions = ['prepaidMedicine', 'indepSocialSecurity', 'donations', 'voluntaryContributions']
    let newTotal = this.state.dependantsDeduction

    deductions.forEach(item => {
      if (deduction === item){
        newTotal += (value || 0)
      } else {
        newTotal += this.state[item]
      }
    })

    return newTotal
  }

  render() {
    const {
      summaryVisible, incomeSources, incomeOutOfTaxes, //INCOME
      prepaidMedicine, indepSocialSecurity, dependants, donations, voluntaryContributions, totalDeductions //DEDUCTIONS
    } = this.state

    const incomes = incomeSources.map(x => {
      switch(x.contract) {
        case 'nomina':
          return x.income > (828116 * 4) ?
            x.income * (x.workedDays/30) * (0.91 + (2.5 /12)) :
            x.income * (x.workedDays/30) * (0.92 + (2.5 /12))
        case 'prestaciones':
          return x.income * (x.workedDays/30)
        case 'contratista':
          return x.income * (x.workedDays/30)
      }
    })
    const totalIncome = incomes.reduce((acum, current)=> acum + current)

    return (
      <div>
        <h1 className={css.title}>Optimiza la declaración de renta</h1>
        <p className={css.description}>
          Hay algunas cosas que puedes hacer para reducir legalmente el valor final a pagar por ingresos de trabajo del 2019. Pero las debes hacer antes del 31 de diciembre de 2019.
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
          deleteIncomeSource={this.deleteIncomeSource}
          summaryVisible={summaryVisible}
          incomeSources={incomeSources}
          incomeOutOfTaxes={incomeOutOfTaxes}
          totalIncome={totalIncome}
        />

        {summaryVisible && <h2 className={css.formTitle}>
          Deducciones
        </h2>}

        {summaryVisible &&  <p className={css.description}>
          Escriba en cada casilla el valor total que espera pagar en el año.
        </p>}

        {summaryVisible && <Deductions
          handleDeductionChange={this.handleDeductionChange}
          prepaidMedicine={prepaidMedicine}
          indepSocialSecurity={indepSocialSecurity}
          dependants={dependants}
          donations={donations}
          voluntaryContributions={voluntaryContributions}
          totalIncome={totalIncome}
        />}

        {summaryVisible && <Outcome
          handleRetentionChange={this.handleRetentionChange}
          liquidIncome={totalIncome - incomeOutOfTaxes}
          totalDeductions={totalDeductions}
          prepaidMedicine={prepaidMedicine}
          incomeSources={incomeSources}
        />}

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
