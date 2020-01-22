import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

export const mockStore = configureMockStore([thunk])

const findAction = (store, type) => {
  return store.getActions().find(action => action.type === type)
}

export const getAction = (store, type) => {
  const action = findAction(store, type)
  if (action) return Promise.resolve(action)

  return new Promise(resolve => {
    store.subscribe(() => {
      const action = findAction(store, type)
      if (action) resolve(action)
    })
  })
}
