import React, { useReducer } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TodoContext } from '../../state/todo/context';
import { Header } from '../header/header';
import { Home } from '../home/home';
import { Todo } from '../todo/todo';
import { todoReducer } from '../../state/todo/reducer';
import { Chat } from '../chat/chat';
import { chatReducer } from '../../state/chat/reducer';
import { ChatContext } from '../../state/chat/context';

function App() {
  const pages = [
    { name: 'Todo', path: 'todo' },
    { name: 'Chat', path: 'chat' },
  ];
  const [todoState, todoDispatch] = useReducer(todoReducer, {
    todos: [],
  });
  const [chatState, chatDispatch] = useReducer(chatReducer, {
    username: '',
    chatId: '',
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
      <ChatContext.Provider
        value={{
          username: chatState.username,
          chatId: chatState.chatId,
          dispatch: chatDispatch,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Header pages={pages} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="todo" element={<Todo />} />
              <Route path="chat" element={<Chat />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ChatContext.Provider>
    </TodoContext.Provider>
  );
}

export default App;
