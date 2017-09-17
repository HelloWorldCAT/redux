import {v4} from 'node-uuid'
import * as api from '../api'

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

export const fetchTodos = (filter) => 
  api.fetchTodos(filter).then(
      response => receiveTodo(response, filter)
  );

export const requestTodos = (filter) =>({
  type: 'REQUEST_TODOS',
  filter
});