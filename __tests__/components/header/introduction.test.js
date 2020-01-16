import React from 'react'
import { mount } from 'enzyme'

import Introduction from '../../../components/header/introduction/introduction'

describe('<Introduction />', () => {
  const introduction = mount(<Introduction />)
  
  test('It renders without crashing', () => {
    expect(introduction.length).toEqual(1)
  })

  test('It shows two paragraphs', () => {
    expect(introduction.find('p').length).toEqual(2)
  })
})
