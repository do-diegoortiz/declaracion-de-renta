import React from 'react'
import { mount, shallow } from 'enzyme'

import FormIncome from '../../../components/income/formIncome/formIncome'

describe('<FormIncome />', () => {
  test('It renders without crashing', () => {
    const formIncome = mount(<FormIncome />)

    expect(formIncome.length).toEqual(1)
  })

  test('It should handle contract change event', () => {
    const handleContractChangeMock = jest.fn()
    const handleDateChangeMock = jest.fn()
    const handleIncomeChangeMock = jest.fn()
    const deleteIncomeSource = jest.fn()
    const event = {
      target: { value: 'nomina' }
    }
    const formIncome = shallow(
      <FormIncome
        handleContractChange={handleContractChangeMock}
        handleDateChange= {handleDateChangeMock}
        handleIncomeChange= {handleIncomeChangeMock}
        deleteIncomeSource= {deleteIncomeSource}
        contract= ''
        incomeIndex= {0}
        fromDate= "2019-01-01T05:00:00.000Z"
        toDate= "2019-12-31T05:00:00.000Z"
      />
    )
    formIncome.find('select').simulate('change', event)

    expect(handleContractChangeMock).toBeCalledWith({'target': {'value': 'nomina'}}, 0)
  })
})
