import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import FormIncome from '../../../components/income/formIncome/formIncome'

describe('<FormIncome />', () => {
  const handleContractChangeMock = jest.fn()
  const handleDateChangeMock = jest.fn()
  const handleIncomeChangeMock = jest.fn()
  const deleteIncomeSource = jest.fn()
  const formIncome = shallow(
    <FormIncome
      handleContractChange={handleContractChangeMock}
      handleDateChange= {handleDateChangeMock}
      handleIncomeChange= {handleIncomeChangeMock}
      deleteIncomeSource= {deleteIncomeSource}
      contract= ''
      incomeIndex= {0}
      income={0}
      fromDate= {moment(new Date(2019, 0, 1))}
      toDate= {moment(new Date(2019, 11, 31))}
    />
  )

  test('It renders without crashing', () => {
    const numberFormat = formIncome.find('NumberFormat')

    expect(formIncome.length).toEqual(1)
    expect(numberFormat.length).toEqual(1)
  })

  test('It should handle contract change event', () => {
    const event = {
      target: { value: 'nomina' }
    }
    formIncome.find('select').simulate('change', event)

    expect(handleContractChangeMock).toBeCalledWith({'target': {'value': 'nomina'}}, 0)
  })
})
