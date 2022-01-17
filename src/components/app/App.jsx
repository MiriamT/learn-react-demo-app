import React, { useReducer } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TodoContext } from '../../state/todo/context';
import { Header } from '../header/header';
import { Home } from '../home/home';
import { Todo } from '../todo/todo';
import { todoReducer } from '../../state/todo/reducer';

function App() {
  const pages = [{ name: 'Todo', path: 'todo' }];
  const [todoState, todoDispatch] = useReducer(todoReducer, {
    todos: [],
  });

  return (
    <TodoContext.Provider
      // context value has the todos state and also the dispatch function
      // so the todos can be updated from any part of the app
      value={{
        todos: todoState.todos,
        dispatch: todoDispatch,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <Header pages={pages} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="todo" element={<Todo />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TodoContext.Provider>
  );
}

export default App;
