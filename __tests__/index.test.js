import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import App from '../pages/index.js'

describe('initial', () => {
  test('first tests', () => {
    expect(true).toBe(true)
  })
})

describe('With Enzyme', () => {
  it('App shows right first parragraph', () => {
    const app = shallow(<App />)

    expect(app.find('p').first().text()).toEqual('Hay algunas cosas que puedes hacer para reducir legalmente el valor final a pagar por ingresos de trabajo del 2019. Pero las debes hacer antes del 31 de diciembre de 2019.')
  })
})

describe('With Snapshot Testing', () => {
  it('App shows "Hello world!"', () => {
    const component = renderer.create(<App />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})