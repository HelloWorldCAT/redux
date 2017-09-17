import {combineReducers} from 'redux'

const createIds = (filter) => {
    const ids = (state = [], action) => {
        if (action.filter !== filter) {
            return state;
        }
        switch (action.type) {
            case 'FETCH_TODO_SUCCESS':
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
            case 'FETCH_TODO_SUCCESS':   
            case 'FETCH_TODO_FAIL':
                return false;
            case 'FETCH_TODO_REQUEST':  
                return true;
            default:
                return state;
        }
    }

    const errorMessage = (state = null, action) =>{
        if (action.filter !== filter) {
            return state;
        }
        switch(action.type){
            case 'FETCH_TODO_FAIL':
                return action.message;
            case 'FETCH_TODO_SUCCESS':   
            case 'FETCH_TODO_REQUEST':  
                return null;
            default:
                return state;
        }
    }
    return combineReducers({
        ids, 
        isFetching,
        errorMessage,
    });
}

export default createIds;

export const getIds = (state) => state.ids;

export const getIsFetching = (state) => state.isFetching;

export const getErrorMessage = (state) => state.errorMessage;