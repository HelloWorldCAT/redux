import { createStore } from 'redux'
import reducer from './reducers'

const addLogingToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    if(!console.group) {
        return rawDispatch;
    }
    return (action) => {
        console.group(action.type);
        console.log('%c pre state', 'color: blue', store.getState());
        console.log('%c action', 'color:green', action);
        const returnValue = rawDispatch(action);
        console.log('%c cur state', 'color:blue', store.getState());
        console.log('%c return value','color: gray',returnValue);
        console.groupEnd(action.type);
        return returnValue;
    }

}


const addPromiseSupport = (store) => {
    const rawDispatch = store.dispatch;
    return (action) => {
        if(typeof action.then === 'function') {
            return action.then(rawDispatch);
        }
        return rawDispatch(action);
    }

}

export const configureStore = () => {
    const store = createStore(reducer);
    if(process.env.NODE_ENV !== 'production') {
        store.dispatch = addLogingToDispatch(store);
    }

    store.dispatch = addPromiseSupport(store);

    return store;
}
