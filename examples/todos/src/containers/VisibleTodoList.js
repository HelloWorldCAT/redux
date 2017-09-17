import { connect } from 'react-redux'
import * as actions from '../actions'
import TodoList from '../components/TodoList'
import {withRouter} from 'react-router'
import {getVisibleTodos,getIsFetchingData,getErrorMessage} from '../reducers'
import React, {Component} from 'react'
import FetchError from '../components/FetchError'


class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps){
    if (this.props.filter !== prevProps.filter){
      this.fetchData();
    }
  }
  
  render() {
    const {toggleTodo, isFetching, todos, errorMessage} = this.props;
    if(isFetching && !todos.length) {
      return <p>Loading... </p>;
    }
    if(errorMessage && !todos.length) {
      return <FetchError message={errorMessage} onRetry={()=>this.fetchData()} />
    }
    return <TodoList todos={todos} onTodoClick={toggleTodo}/>;
  }

  fetchData() {
    const {filter, fetchTodos} = this.props;
    fetchTodos(filter);
  }
}

const mapStateToProps = (state, { match: { params } }) =>{
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetchingData(state, filter),
    filter
  }
};

const mapDispatchToProps = {
  ...actions
};

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoList));

export default VisibleTodoList
