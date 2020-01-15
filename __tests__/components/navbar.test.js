import React from 'react'
import { mount } from 'enzyme'
import { create } from 'react-test-renderer'

import Navbar from '../../components/navbar/navbar'

describe('<Navbar />', () => {
  
  test('It render without crashing', () => {
    const navbar = mount(<Navbar />)
    expect(navbar.length).toEqual(1)
  })

  test('Check the component UI', () => {
    const navbar = create(<Navbar />)
    expect(navbar.toJSON()).toMatchSnapshot()
  })
})
