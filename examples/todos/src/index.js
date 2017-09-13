import { render } from 'react-dom'
import {configureStore} from './configureStore'
import Root from './components/Root'
import React from 'react'

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('root')
);
