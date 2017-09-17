import { createStore } from 'redux'
import reducer from './reducers'

const logger = (store) =>(next) => {
    if(!console.group) {
        return next;
    }
    return (action) => {
        console.group(action.type);
        console.log('%c pre state', 'color: blue', store.getState());
        console.log('%c action', 'color:green', action);
        const returnValue = next(action);
        console.log('%c cur state', 'color:blue', store.getState());
        console.log('%c return value','color: gray',returnValue);
        console.groupEnd(action.type);
        return returnValue;
    }
}




const promise = (store) => (next) =>(action) => {
    if(typeof action.then === 'function') {
        return action.then(next);
    }
    return next(action);
}

    
const wrapMiddleware = (middlewares, store) => {
    middlewares.slice().reverse().forEach(middleware => {
        store.dispatch = middleware(store)(store.dispatch);
    });
}

export const configureStore = () => {
    const store = createStore(reducer);
    const middlewares = [promise];
    if(process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    wrapMiddleware(middlewares, store);

    return store;
}
