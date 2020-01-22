import * as actions from '../../../store/actions/index'
import {initialState} from '../../../__mocks__/reducersMock'
import { mockStore, getAction } from '../../../__mocks__/storeMock'
import { incomeSources } from '../../../__mocks__/incomeMock'

describe('Income actions', () => {
  test('handleIncomeChange action', async () => {
    const store = mockStore(initialState)
    store.dispatch(actions.handleIncomeChange(1000000, 0))

    expect(await getAction(store, 'UPDATE_INCOME_SOURCES')).toEqual({type: 'UPDATE_INCOME_SOURCES', data: [incomeSources] })
  })
})
