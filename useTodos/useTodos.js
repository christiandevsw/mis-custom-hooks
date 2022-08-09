import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';

const initialState = [
  // {
  //   id: new Date().getTime(),
  //   description: 'la piedra del alba',
  //   done: false,
  // },
  // {
  //   id: new Date().getTime() * 2,
  //   description: 'la piedra del anochecer',
  //   done: false,
  // },
];

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = todo => {
    const action = {
      type: '[TODO] Add Todo',
      payload: todo,
    };
    dispatch(action);
  };

  const handleDeleteTodo = id => {
    dispatch({
      type: '[TODO] Remove Todo',
      payload: id,
    });
  };

  const handleToggleTodo = id => {
    dispatch({
      type: '[TODO] Toogle Todo',
      payload: id,
    });
  };

  return {
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter(todo => !todo.done).length,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
  };
};
