import React from 'react'
import { mount } from 'enzyme'
import { create } from 'react-test-renderer'

import MobileHeader from '../../../components/header/mobileHeader/mobileHeader'

describe('<MobileHeader />', () => {
  
  test('It render without crashing', () => {
    const mobileHeader = mount(<MobileHeader />)
    expect(mobileHeader.length).toEqual(1)
  })

  test('Check the component UI', () => {
    const mobileHeader = create(<MobileHeader />)
    expect(mobileHeader.toJSON()).toMatchSnapshot()
  })
})
