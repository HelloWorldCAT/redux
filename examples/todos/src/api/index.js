import { v4 } from 'node-uuid';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
  todos: [{
    id: v4(),
    text: 'hey',
    completed: true,
  }, {
    id: v4(),
    text: 'ho',
    completed: true,
  }, {
    id: v4(),
    text: 'let’s go',
    completed: false,
  }],
};

const delay = (ms) => 
    new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) => 
    delay(1000).then(data => {
        // if(Math.random()>0.5){
        //     throw Error(`fetch ${filter} fail`);
        // }
        switch(filter){
            case 'all':
                return fakeDatabase.todos;
            case 'active':
                return fakeDatabase.todos.filter(todo => !todo.completed)
            case 'completed':
                return fakeDatabase.todos.filter(todo => todo.completed)
            default:
                throw new Error(`Unknow filter: ${filter}`);
        }
    });


export const addTodos = (text) => 
    delay(1000).then(()=>{
        const todo = {
            id: v4(),
            text,
            completed: false
        };
        fakeDatabase.todos.push(todo);
        return todo;
    });

export const toggleTodo = (id) => 
    delay(1000).then(()=> {
        const todo = fakeDatabase.todos.find(todo=>todo.id === id);
        todo.completed = !todo.completed;
        return todo;
    })