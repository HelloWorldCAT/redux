import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import {withRouter} from 'react-router'
import {getVisibleTodos} from '../reducers'

const mapStateToProps = (state, { match: { params } }) =>({
  todos: getVisibleTodos(state, params.filter || 'all')
});

const mapDispatchToProps = {
  onTodoClick: toggleTodo
};

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList));

export default VisibleTodoList
