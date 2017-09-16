import { createStore } from 'redux'
import reducer from './reducers'
import {loadState, saveState} from './localStorage'
import throttle from 'lodash/throttle'

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

export const configureStore = () => {
    const persistedState = loadState();
    const store = createStore(reducer, persistedState);
    if(process.env.NODE_ENV !== 'production') {
        store.dispatch = addLogingToDispatch(store);
    }

    store.subscribe(throttle(() => {
    saveState({
        todos:store.getState().todos
        });
    }, 1000));
    return store;
}
