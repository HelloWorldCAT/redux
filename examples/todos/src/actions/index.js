import * as api from '../api'
import {normalize} from 'normalizr'
import * as schema from '../schema'
import {getIsFetchingData} from '../reducers'

export const addTodo = (text) => (dispatch) => {
  api.addTodos(text).then((response) => {
    dispatch({
      type:'ADD_TODO_SUCCESS',
      response: normalize(response, schema.todo) 
    });
  });
};

export const toggleTodo = (id) => (dispatch) =>{
  api.toggleTodo(id).then((response)=>{
    dispatch({
      type: 'TOGGLE_TODO_SUCCESS',
      response: normalize(response, schema.todo),
    });
  });
};

export const fetchTodos = (filter) => (dispatch, getState) => {
  if(getIsFetchingData(getState(), filter)){
    return Promise.resolve();
  }
  dispatch({
    type: 'FETCH_TODO_REQUEST',
    filter
  });
  api.fetchTodos(filter).then(
    response => {
      dispatch({
      type: 'FETCH_TODO_SUCCESS',
      response: normalize(response, schema.arrayOfTodos),
      filter
    })
  }
    ,
    error => dispatch({
      type: 'FETCH_TODO_FAIL',
      filter,
      message: error.message || 'something went wrong.'
    })
  );
}
