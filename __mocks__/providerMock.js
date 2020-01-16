import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../store/reducers';

const store = createStore(reducer);

const ProviderMock = props => (
  <Provider store={store}>
    {props.children}
  </Provider>
);

export default ProviderMock;
