import {combineReducers} from 'redux'

const createIds = (filter) => {
    const handleToggle = (state, action) => {
        const {result: toggledId, entities} = action.response;
        const {completed} = entities.todo[toggledId];
        const shouldRemove = (
            (completed && filter === 'active') ||
            (!completed && filter === 'completed'));
        return shouldRemove ? state.filter(id => id!==toggledId) : state;
    }
    const ids = (state = [], action) => {
        switch (action.type) {
            case 'FETCH_TODO_SUCCESS':
                return filter === action.filter ?
                    action.response.result :
                    state;
            case 'ADD_TODO_SUCCESS':
                return filter !== 'completed' ? 
                    [...state, action.response.result] : 
                    state;
            case 'TOGGLE_TODO_SUCCESS':
                return handleToggle(state, action); 
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