import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../store/actions/index'
import Income from '../components/income/income'
import Deductions from '../components/deductions/deductions'
import Outcome from '../components/outcome/outcome'
import MobileHeader from '../components/header/mobileHeader/mobileHeader'
import Introduction from '../components/header/introduction/introduction'
import Footer from '../components/footer/footer'
import FormLayoff from '../components/income/formLayoff/formLayoff'

import css from './index.scss'

class Home extends React.Component {
  render() {
    const { hasToDeclare, summaryVisible, deductionsVisible, view } = this.props.home
    const { incomeSources, totalIncome, incomeOutOfTaxes, layoffsLastYear, emptyLayoff } = this.props.income
    const {
      prepaidMedicine, indepSocialSecurity, homeLoanInteres, dependants, donations, voluntaryContributions, totalDeductions
    } = this.props.deduction
    const { 
      showDeductions, increaseIncomeSources, showSummary, deleteIncomeSource, handleIncomeChange, 
      updateTotalIncome, handleContractChange, handleWorkedDays, handleDeductionChange, handleRetentionChange,
      handleLayoffChange, handleView, handleLayoff
    } = this.props

    return (
      <>
        <MobileHeader />
        {view === 'addIncomes' && (
          <div className={css.container}>
            <Introduction />

            <h2 className={css.formTitle}>
              Ingresos 2019
            </h2>

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
          </div>
        )}
        {view === 'addLayoff' && (
          <FormLayoff
            handleLayoffChange={handleLayoffChange}
            layoffsLastYear={layoffsLastYear}
            handleView={handleView}
            emptyLayoff={emptyLayoff}
            handleLayoff={handleLayoff}
          />
        )}
        {view === 'addDeductions' && (
          <Deductions
            handleDeductionChange={handleDeductionChange}
            handleView={handleView}
          />
        )}
        {view === 'summary' && (
          <>
            <Outcome
              handleRetentionChange={handleRetentionChange}
              liquidIncome={totalIncome - incomeOutOfTaxes}
              totalDeductions={totalDeductions}
              prepaidMedicine={prepaidMedicine}
              incomeSources={incomeSources}
            />
            <Footer />
          </>
        )}
      </>
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
    handleLayoffChange: (e, newValue) => dispatch(actions.handleLayoffChange(e, newValue)),
    handleView: (newView) => dispatch(actions.handleView(newView)),
    handleLayoff: () => dispatch(actions.handleLayoff())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)
