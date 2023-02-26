import { cloneDeep } from 'lodash';

export const TodoActions = Object.freeze({
  ADD: 'ADD',
  DELETE: 'DELETE',
  TOGGLE: 'TOGGLE',
  REORDER: 'REORDER',
});

let nextTodoId = 0;
function getNextTodoId() {
  return ++nextTodoId;
}

export function todoReducer(state, action) {
  switch (action.type) {
    case TodoActions.ADD:
      return addTodo(state, action);
    case TodoActions.DELETE:
      return deleteTodo(state, action);
    case TodoActions.TOGGLE:
      return toggleTodo(state, action);
    case TodoActions.REORDER:
      return reorderTodo(state, action);
    default:
      throw new Error(`Todo Reducer does not recognize ${action.type}`);
  }
}

function addTodo(state, action) {
  const newTodo = { ...action.todo, id: String(getNextTodoId()) };
  return { ...state, todos: [...state.todos, newTodo] };
}

function deleteTodo(state, action) {
  const remainingTodos = state.todos.filter((todo) => todo.id !== action.id);
  return { ...state, todos: remainingTodos };
}

function toggleTodo(state, action) {
  let newTodos = cloneDeep(state.todos);
  const todoIndex = newTodos.findIndex((todo) => todo.id === action.id);
  const todo = newTodos[todoIndex];
  todo.complete = !todo.complete;

  if (todo.complete) {
    newTodos = reorderArray(newTodos, todoIndex, newTodos.length - 1);
  } else {
    newTodos = reorderArray(newTodos, todoIndex, 0);
  }

  return { ...state, todos: newTodos };
}

function reorderTodo(state, action) {
  const reorderedTodos = reorderArray(
    state.todos,
    action.sourceIndex,
    action.destinationIndex
  );
  return { ...state, todos: reorderedTodos };
}

function reorderArray(array, sourceIndex, destinationIndex) {
  const reorderedArray = Array.from(array);
  const [item] = reorderedArray.splice(sourceIndex, 1); // pull out the item
  reorderedArray.splice(destinationIndex, 0, item); // add it back at a new index
  return reorderedArray;
}
