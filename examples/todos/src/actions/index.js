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

const receiveTodo = (todos, filter) => ({
  type: 'RECEIVE_TODOS',
  todos,
  filter
});

const requestTodos = (filter) =>({
  type: 'REQUEST_TODOS',
  filter
});

export const fetchTodos = (filter) => (dispatch, getState) => {
  if(getIsFetchingData(getState(), filter)){
    return Promise.resolve();
  }
  dispatch(requestTodos(filter));
  api.fetchTodos(filter).then(
      response => dispatch(receiveTodo(response, filter))
  );
}
