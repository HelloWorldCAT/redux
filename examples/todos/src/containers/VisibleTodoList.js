import { connect } from 'react-redux'
import * as actions from '../actions'
import TodoList from '../components/TodoList'
import {withRouter} from 'react-router'
import {getVisibleTodos,getIsFetchingData} from '../reducers'
import React, {Component} from 'react'


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
    const {toggleTodo, isFetching, todos} = this.props;
    if(isFetching && !todos.length) {
      return <p>Loading... </p>;
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
