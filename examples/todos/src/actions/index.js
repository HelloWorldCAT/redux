import {v4} from 'node-uuid'
import * as api from '../api'
import {getIsFetchingData} from '../reducers'

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});

export const fetchTodos = (filter) => (dispatch, getState) => {
  if(getIsFetchingData(getState(), filter)){
    return Promise.resolve();
  }
  dispatch({
    type: 'FETCH_TODO_REQUEST',
    filter
  });
  api.fetchTodos(filter).then(
    todos => dispatch({
      type: 'FETCH_TODO_SUCCESS',
      todos,
      filter
    })
    ,
    error => dispatch({
      type: 'FETCH_TODO_FAIL',
      filter,
      message: error.message || 'something went wrong.'
    })
  );
}
