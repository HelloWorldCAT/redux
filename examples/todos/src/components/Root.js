import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'

const Root = ({store}) => (
    <Provider store={store}>
        <Router>
            <App>
                <Route path='/(:filter)'></Route>

            </App>
        </Router>
    </Provider>
)

export default Root;