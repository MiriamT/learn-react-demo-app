import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/header/header';
import { Home } from './components/home/home';
import { Todo } from './components/todo/todo';

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
