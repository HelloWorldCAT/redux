import { connect } from 'react-redux'
import * as actions from '../actions'
import TodoList from '../components/TodoList'
import {withRouter} from 'react-router'
import {getVisibleTodos} from '../reducers'
import React, {Component} from 'react'


class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(){
    this.fetchData();
  }
  
  render() {
    const {toggleTodo, ...rest} = this.props;
    return <TodoList {...rest} onTodoClick={toggleTodo}/>
  }

  fetchData() {
    const {filter, fetchTodos} = this.props;
    fetchTodos(filter)
  }
}

const mapStateToProps = (state, { match: { params } }) =>{
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
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
