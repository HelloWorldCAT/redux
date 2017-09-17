const createIds = (filter) => (state = [], action) => {
    if (action.filter !== filter) {
        return state;
    }
    switch (action.type) {
        case 'RECEIVE_TODOS':
            return action.todos.map(todo => todo.id);
        default:
            return state;
    }
}

export default createIds;

export const getIds = (state) => state;