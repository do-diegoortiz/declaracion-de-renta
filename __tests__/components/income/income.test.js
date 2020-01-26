import React from 'react'
import { mount } from 'enzyme'
import ProviderMock from '../../../__mocks__/providerMock'
import {initialState} from '../../../__mocks__/reducersMock'

import Income from '../../../components/income/income'

describe('<Income />', () => {
  const handleIncomeChange = jest.fn()
  const handleContractChange = jest.fn()
  const handleWorkedDays = jest.fn()
  const handleLayoffChange = jest.fn()
  const updateTotalIncome = jest.fn()
  const showSummary = jest.fn()
  const showDeductions = jest.fn()
  const increaseIncomeSources = jest.fn()
  const deleteIncomeSource = jest.fn()
  
  const income = mount(
    <ProviderMock>
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
        summaryVisible={initialState.home.summaryVisible}
        hasToDeclare={initialState.home.hasToDeclare}
        incomeSources={initialState.income.incomeSources}
        incomeOutOfTaxes={initialState.income.incomeOutOfTaxes}
        layoffsLastYear={initialState.income.layoffsLastYear}
        totalIncome={initialState.income.totalIncome}
      />
    </ProviderMock>
  )

  test('It renders without crashing', () => {
    expect(income.length).toEqual(1)
  })
  test('It renders buttons without crashing', () => {
    const blueLink = income.find(Income).find('BlueLink')
    const greenButton = income.find(Income).find('GreenButton')
    const blueButton = income.find(Income).find('BlueButton')

    expect(blueLink.length).toEqual(1)
    expect(greenButton.length).toEqual(1)
    expect(blueButton.length).toEqual(1)

  })
})
