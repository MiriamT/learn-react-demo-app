import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from '../header/header';
import { Home } from '../home/home';
import { Todo } from '../todo/todo';
import { Chat } from '../chat/chat';
import { ChatProvider } from '../../state/chat/context';
import { TodoProvider } from '../../state/todo/context';

export const App = () => {
  const pages = [
    { name: 'Todo', path: 'todo' },
    { name: 'Chat', path: 'chat' },
  ];

  return (
    <TodoProvider>
      <ChatProvider>
        <Header pages={pages} navigate={useNavigate()} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="todo" element={<Todo />} />
          <Route path="chat" element={<Chat />} />
        </Routes>
      </ChatProvider>
    </TodoProvider>
  );
};

export const AppWithRouter = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
