import { shallow } from 'enzyme'
import React from 'react'
import ProviderMock from '../__mocks__/providerMock'

import App from '../pages/index.js'

describe('<App />', () => {
  it('It render without crashing', () => {
    const app = shallow(
      <ProviderMock>
        <App />
      </ProviderMock>
    )

    expect(app.length).toEqual(1)
  })
})
