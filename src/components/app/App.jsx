import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '../header/header';
import { Home } from '../home/home';
import { Todo } from '../todo/todo';

function App() {
  const pages = [{ name: 'Todo', path: 'todo' }];

  return (
    <BrowserRouter>
      <div className="App">
        <Header pages={pages} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="todo" element={<Todo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
