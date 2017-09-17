import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

export const configureStore = () => {
    const middlewares = [thunk];
    if(process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger);
    }
    
    return createStore(reducer, 
        applyMiddleware(...middlewares));
}
