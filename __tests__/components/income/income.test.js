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
  
  test('It renders without crashing', () => {
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
    const blueLink = income.find(Income).find('BlueLink')
    
    expect(income.length).toEqual(1)
    expect(blueLink.length).toEqual(1)
  })
})
