import React from 'react'
import Income from '../components/income/income'
import Deductions from '../components/deductions/deductions'
import Outcome from '../components/outcome/outcome'

import css from './index.scss'

const UVT = 34270

class Home extends React.Component {
  state = {
    // https://bogota.gov.co/mi-ciudad/hacienda/quienes-y-cuando-declarar-renta-en-2019
    hasToDeclare: false, // When gross income > 1400 UVT
    hasToPay: false, // When (liquid income - deductions) > 1090 UVT
    summaryVisible: false,
    deductionsVisible: false,

    // INCOME
    incomeSources: [
      {
        income: 0,
        retention: 0,
        workedDays: 365,
        stillThere: true, // Needed in 'nomina' contract to know if "Cesantias" were and income or not
        contract: 'nomina' // The other two options are 'prestaciones' and 'contratista'
      }
    ],
    layoffsLastYear: 0, // Locally known as "Cesantias"
    totalIncome: 0,
    incomeOutOfTaxes: 0,

    // DEDUCTIONS
    totalLayoffs: 0,
    prepaidMedicine: 0,
    indepSocialSecurity: 0,
    homeLoanInteres: 0,
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
      this.updateTotalIncome()
    }
  }

  handleContractChange = (e, index) => {
    const sourcesCopy = [...this.state.incomeSources]
    sourcesCopy[index].contract = e.target.value

    this.setState({incomeSources: sourcesCopy})
    this.updateRetention(index, sourcesCopy[index].income, e.target.value)
    this.updateIncomeOutOfTaxes()
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
    } else {
      sourcesCopy[index].retention = 0
    }

    this.setState({incomeSources: sourcesCopy})
  }

  handleWorkedDays = (days, index, stillThere) => {
    const sourcesCopy = [...this.state.incomeSources]
    sourcesCopy[index].workedDays = days
    sourcesCopy[index].stillThere = stillThere

    this.setState({incomeSources: sourcesCopy})
    this.updateTotalIncome()
    this.updateTotalLayoffs()
    this.updateIncomeOutOfTaxes()
  }

  showSummary = e => {
    e.preventDefault()

    if (this.state.incomeSources[0].income) {
      this.setState({ summaryVisible: true })
    }

    this.updateIncomeOutOfTaxes()
  }

  showDeductions = e => {
    e.preventDefault()

    this.setState({ deductionsVisible: true })
  }

  getMonthsWorked = (index) => {
    const workedDays = this.state.incomeSources[index].workedDays
    return workedDays === 365 || workedDays === 364 ? 12 : (workedDays/30)
  }

  updateTotalLayoffs = () => {
    const incomeSources = [...this.state.incomeSources]
    let newTotalLayoffs = this.state.layoffsLastYear

    newTotalLayoffs = incomeSources.reduce((acum, currentIncome, i) => {return currentIncome.stillThere ? acum + 0 : acum + (currentIncome.income * this.getMonthsWorked(i) / 12)}, newTotalLayoffs)
    const newTotalDeductions = newTotalLayoffs + this.getNotLayoffDeductions()

    this.setState({ totalLayoffs: newTotalLayoffs, totalDeductions: newTotalDeductions })
  }

  updateIncomeOutOfTaxes = () => {
    let outOfTaxCopy = 0
    const incomeSources = [...this.state.incomeSources]

    for (let i = 0; i < incomeSources.length; i++) {
      if (incomeSources[i].contract === 'nomina') {
        // If income is below certain UVT's is not 9% but 8%. Because 1% of Solidaridad wouldn't be included
        outOfTaxCopy += incomeSources[i].income * this.getMonthsWorked(i) * 0.09
      } else {
        // As independant you pay based on the 40% of your salary. 12.5% in health and 16% in retirement.
        outOfTaxCopy += incomeSources[i].income * this.getMonthsWorked(i) * 0.4 * 0.285
      }
    }

    this.setState({ incomeOutOfTaxes: outOfTaxCopy })
  }

  updateTotalIncome = (layoffLastYear = 0) => {
    const sourcesCopy = [...this.state.incomeSources]
    const incomes = sourcesCopy.map((x, i) => {
      // TODO: Improve variable naming here
      const includesLayoffs = !x.stillThere
      const monthsWorked = this.getMonthsWorked(i)

      switch(x.contract) {
        case 'nomina':
          return x.income > (828116 * 4) ?
            x.income * monthsWorked * (0.91 + ((includesLayoffs ? 2 : 1) /12)) :
            x.income * monthsWorked * (0.92 + ((includesLayoffs ? 2 : 1) /12))
        case 'prestaciones':
          return x.income * monthsWorked
        case 'contratista':
          return x.income * monthsWorked
      }
    })

    const newTotalIncome = incomes.reduce((acum, current)=> acum + current) + (layoffLastYear ? layoffLastYear : this.state.layoffsLastYear)
    const newHasToDeclare = newTotalIncome > 1400 * UVT ? true : false

    this.setState({ totalIncome: newTotalIncome, hasToDeclare: newHasToDeclare })
  }

  // DEDUCTIONS
  handleDeductionChange = (e, newValue) => {
    let totalDeductions = 0
    const totalIncome = this.state.incomeSources.map((x, i) => x.income * this.getMonthsWorked(i)).reduce((acum, current)=> acum + current)
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

  handleRetentionChange = (newRetention, index) => {
    if (newRetention) {
      const newValue = parseInt(newRetention)
      const sourcesCopy = [...this.state.incomeSources]
      sourcesCopy[index].retention = newValue

      this.setState({incomeSources: sourcesCopy})
    }
  }

  handleLayoffChange = (e, newValue) => {
    e.preventDefault()
    this.setState({layoffsLastYear: parseInt(newValue)})
    this.updateTotalIncome(parseInt(newValue))
  }

  getNotLayoffDeductions() {
    return this.state.prepaidMedicine
    + this.state.indepSocialSecurity
    + this.state.dependantsDeduction
    + this.state.donations
    + this.state.voluntaryContributions
  }

  getTotalDeductionsDependants(value) {
    return this.state.totalLayoffs
      + this.state.prepaidMedicine
      + this.state.indepSocialSecurity
      + value
      + this.state.donations
      + this.state.voluntaryContributions
  }

  getTotalDeductionsStandard(deduction, value) {
    const deductions = ['totalLayoffs', 'prepaidMedicine', 'indepSocialSecurity', 'homeLoanInteres', 'donations', 'voluntaryContributions']
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
      summaryVisible, deductionsVisible, hasToDeclare,
      incomeSources, totalIncome, incomeOutOfTaxes, layoffsLastYear,//INCOME
      prepaidMedicine, indepSocialSecurity, homeLoanInteres, dependants, donations, voluntaryContributions, totalDeductions //DEDUCTIONS
    } = this.state

    return (
      <div>
        <h1 className={css.title}>Optimiza la declaración de renta</h1>
        <p className={css.description}>
          Hay algunas cosas que puedes hacer, antes del 31 de diciembre de 2019, para reducir legalmente el impuesto a pagar por ingresos de trabajo del 2019.
        </p>
        <p className={css.description}>
          De momento, aquí podrás saber si debes declarar renta el próximo año y algunos consejos para optimizar el pago de este impuesto.
        </p>

        <h2 className={css.formTitle}>
          Ingresos
        </h2>

        <p className={css.description}>
          Si sabes el valor exacto o aproximado de las cesantías que te pudieron haber consignado en febrero de este año, ingresalo en el primer campo. Si no es tu caso, llena solo la sección de ingresos laborales de 2019
        </p>

        <Income
          handleIncomeChange={this.handleIncomeChange}
          handleContractChange={this.handleContractChange}
          handleWorkedDays={this.handleWorkedDays}
          handleLayoffChange={this.handleLayoffChange}
          updateTotalIncome={this.updateTotalIncome}
          showSummary={this.showSummary}
          showDeductions={this.showDeductions}
          increaseIncomeSources={this.increaseIncomeSources}
          deleteIncomeSource={this.deleteIncomeSource}
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
                handleDeductionChange={this.handleDeductionChange}
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
              handleRetentionChange={this.handleRetentionChange}
              liquidIncome={totalIncome - incomeOutOfTaxes}
              totalDeductions={totalDeductions}
              prepaidMedicine={prepaidMedicine}
              incomeSources={incomeSources}
            />
          </div>
        }

        <footer className={css.finalMessages}>
          <span>
            Avisos Parroquiales:
          </span>
          <ul>
            <li>
              <strong>¿Qué le mejorarías, agregarías...?</strong> <a target='_blank' rel='noreferrer' href='https://forms.gle/qY56BbJXzuK23kPR7'>Encuesta corta</a> de 4 preguntas para seguir mejorando y tener algo mucho más útil en 2020 😉
            </li>
            <li>
              Si no conocen fundaciones a dónde <b>donar</b>, conozco algunas chéveres: <a target='_blank' rel='noreferrer' href='http://biblioseo.org/'>Biblioseo</a>, <a target='_blank' rel='noreferrer' href='https://www.techo.org/colombia/'>Techo</a> y <a target='_blank' rel='noreferrer' href='http://angelesdemedellin.blogspot.com/'>AngelesDeMedellin</a>. Desde enero estará constituida <a target='_blank' rel='noreferrer' href='https://medium.com/codeyourfutureco/introducing-code-your-future-colombia-5f7d3d442eda'> CodeYourFuture Colombia</a> 💪
              
            </li>
          </ul>
        </footer>

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
