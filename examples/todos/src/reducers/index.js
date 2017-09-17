import { combineReducers } from 'redux'
import byId, * as fromByIds from './byId'
import createIds, * as fromCreateIds from './createIds'


const idsByFilter = combineReducers({
  all: createIds('all'),
  active: createIds('active'),
  completed:createIds('completed')
});

const todos = combineReducers({
  byId, 
  idsByFilter
});

export default todos;


export const getVisibleTodos = (state, filter) => {
  const ids = fromCreateIds.getIds(state.idsByFilter[filter]);
  return ids.map(id => fromByIds.getTodo(state.byId, id));
}

export const getIsFetchingData = (state, filter) => {
  return fromCreateIds.getIsFetching(state.idsByFilter[filter]);
}