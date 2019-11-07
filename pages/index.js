import React from 'react'
import Head from 'next/head'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import Income from '../components/income/income'
import Deductions from '../components/deductions/deductions'

import css from './index.scss'

const UVT = 33156

class Home extends React.Component {
  state = {
    // INCOME
    income: 0,
    fromDate: new Date(),
    toDate: moment(new Date(2019, 11, 31), 'YYYY-MM-DD'),
    showSummary: false,
    contract: 'nomina',

    // DEDUCTIONS
    prepaidMedicine: 0,
    indepSocialSecurity: 0,
    dependants: 0,
    donations: 0,
    voluntaryContributions: 0
  }

  handleIncomeChange = newIncome => {
    this.setState(() => {
      let incomeCopy
      if (newIncome) {
        const newValue = parseInt(newIncome, 0)
        incomeCopy = newValue
      }

      return { income: incomeCopy }
    })
  }

  handleDateChange = e => {
    e.preventDefault()
    e.persist()

    this.setState(() => {
      let newDateCopy = new Date();

      if (e.target) {
        newDateCopy = moment(e.target.value, 'YYYY-MM-DD')
      }

      return { [e.target.name]: newDateCopy }
    })
  }

  handleContractChange = e => {
    this.setState({contract: e.target.value})
  }

  calculateIncome = e => {
    e.preventDefault()
    this.setState({ showSummary: true })
  }

  // DEDUCTIONS
  handleDeductionChange = (e, newValue) => {
    this.setState({[e.target.name]: newValue})
  }

  render() {
    const {
      income, fromDate, toDate, showSummary, contract, //INCOME
      prepaidMedicine, indepSocialSecurity, dependants, donations, voluntaryContributions //DEDUCTIONS
    } = this.state

    const totalDays = toDate.diff(fromDate, 'days', false)
    
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
          handleDateChange={this.handleDateChange}
          handleContractChange={this.handleContractChange}
          calculateIncome={this.calculateIncome}
          income={income}
          fromDate={fromDate}
          toDate={toDate}
          showSummary={showSummary}
          contract={contract}
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

        <h3 style={{'color': 'red'}}>
          Valor a consignar en pensiones voluntarias:
          <NumberFormat
            // MEJORAR FORMULA PARA NO RESTAR TODO, SINO SOLO CUANDO PASE DEL 5%
            value={(income / 30 * totalDays ) > (UVT * 1090) ? (((income / 30) * totalDays * 0.1) - prepaidMedicine - indepSocialSecurity - dependants - donations - voluntaryContributions) : 0 }
            thousandSeparator={true}
            prefix='$'
            decimalScale='0'
          />
        </h3>

        <ul className= {css.primary}>
          <h1>Info personal</h1>
          <li className={css.para}>Información reportada por terceros</li>
          <li className={css.para}>Formulario del año anterior</li>

          <h1>Productos financieros</h1>
          <li className={css.para}>Certificado anual de retención en la fuente de cada banco</li>
          <li className= {css.list}>
            <h3 className={css.listTitle}>Productos no bancarios</h3>
            <ul className={css.por}>
              <li>Comisionistas de bolsa</li>
              <li>Acciones de sociedades privadas</li>
              <li>Cooperativas de ahorro y compañias de financiamiento</li>
              <li>Criptomonedas</li>
              <li>Prástamos a terceros</li>
              <li>Efectivo</li>
            </ul>
          </li>
          <li className ={css.list}>
            <h3 className={css.listTitle}>Deudas no bancarias</h3>
            <ul className={css.por}>
              <li>Créditos educativos</li>
              <li>Deudas con terceros</li>
            </ul>
          </li>

          <h1>Bienes</h1>
          <li className = {css.list}>
            <h3 className={css.listTitle}>Bienes Personales</h3>
            <ul className={css.por}>
              <li>Vehiculos personales</li>
              <li>Bienes raices</li>
              <li>Bienes raices sobre planos</li>
              <li>Otros bienes o articulos personales</li>
            </ul>
          </li>
          <li className = {css.list}>
            <h3 className={css.listTitle}>Bienes De Tu Negocio Personal</h3>
            <ul className={css.por}>
              <li>Maquinas o bienes de uso comercial</li>
              <li>Inventarios</li>
              <li>Bienes raices para desarrollo del negocio</li>
            </ul>
          </li>


          <h1>Ingresos</h1>
          <li className ={css.list}>
            <h3 className={css.listTitle}>Ingresos laborales o pensionales</h3>
            <ul className={css.por1}>
              <li>Salario (Certificado ingresos y retenciones de cada trabajo)</li>
              <li>Honorarios, servicios o comisiones como independiente (Cta cobro o cert+retenciones e Información de Gastos)</li>
              <li>Negocio propio</li>
              <li>Pensiones de jubilación</li>
            </ul>
          </li>
          <li className={css.list}>
            <h3 className={css.listTitle}>Ingresos por arrendamientos</h3>
            <ul className={css.por}>
              <li>Arrendamiento de bienes raices</li>
              <li>Arrendamiento de vehículos</li>
              <li>Arrendamiento de maquinaria</li>
              <li>Arrendamiento de otros bienes</li>
            </ul>
          </li>
          <li className={css.list}>
            <h3 className={css.listTitle}>Ingresos por venta de bienes</h3>
            <ul className={css.por}>
              <li>Venta de vehículo</li>
              <li>Venta de bienes raices incluyendo lote</li>
              <li>Venta de acciones o participaciones en sociedades</li>
              <li className={css.list1}>
                Venta de otros bienes
                <ul>
                  <li className ={css.listte}>(e.g. venta de computador a LEC y su rte/fte, con fecha aproximada)</li>
                  <li className ={css.listte}>(e.g. compra del mismo)</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className={css.list}>
            <h3 className={css.listTitle}>Ingresos ocasionales</h3>
            <ul className={css.por}>
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
        </ul>
      </div>
    )
  }
}

export default Home
