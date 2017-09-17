import {combineReducers} from 'redux'

const createIds = (filter) => {
    const ids = (state = [], action) => {
        if (action.filter !== filter) {
            return state;
        }
        switch (action.type) {
            case 'RECEIVE_TODOS':
                return action.todos.map(todo => todo.id);
            default:
                return state;
        }
    };
    const isFetching = (state = false, action) => {
        if (action.filter !== filter) {
            return state;
        }
        switch(action.type){
            case 'RECEIVE_TODOS':   
                return false;
            case 'REQUEST_TODOS':  
                return true;
            default:
                return state;
        }
    }
    return combineReducers({ids, isFetching});
}

export default createIds;

export const getIds = (state) => state.ids;

export const getIsFetching = (state) => state.isFetching;