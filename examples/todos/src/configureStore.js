import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import promise from 'redux-promise'
import createLogger from 'redux-logger'

export const configureStore = () => {
    const middlewares = [promise];
    if(process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger);
    }
    
    return createStore(reducer, 
        applyMiddleware(...middlewares));
}
