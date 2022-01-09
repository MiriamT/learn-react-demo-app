import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Container,
  Divider,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { FooterS, primaryColor, TitleS } from '../common/common.styles';

export const Todo = () => {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);

  function onInputChange(event) {
    setInputText(event.target.value);
  }

  function addTodo() {
    if (inputText !== '') {
      todos.push({ label: inputText, complete: false });
      setTodos([...todos]);
      setInputText('');
    }
  }

  function deleteTodo(index) {
    todos.splice(index, 1);
    setTodos([...todos]);
  }

  function completeTodo(index) {
    const completedTodo = todos.splice(index, 1)[0];
    completedTodo.complete = true;
    setTodos([...todos, completedTodo]);
  }

  function onInputKeyUp(event) {
    if (event.key === 'Enter') {
      addTodo();
    }
  }

  return (
    <div>
      <Container maxWidth="lg" className="page-content">
        <TitleS
          variant="h1"
          sx={{
            typography: 'h1',
          }}
        >
          Todo
        </TitleS>

        <Box sx={{ maxWidth: '50rem' }}>
          <Box sx={{ margin: '2rem' }}>
            <Input
              placeholder="enter task"
              onChange={onInputChange}
              value={inputText}
              onKeyUp={onInputKeyUp}
              sx={{ width: '75%', marginRight: '0.5rem' }}
            />
            <IconButton aria-label="add" color="primary" onClick={addTodo}>
              <AddIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              background: primaryColor,
              borderRadius: '0.8rem',
              padding: '0.5rem',
            }}
          >
            <List
              sx={{
                background: 'white',
                borderRadius: '0.4rem',
                minHeight: '55vh',
              }}
            >
              {todos.map((todo, index) => (
                <div key={index}>
                  <ListItem>
                    <ListItemText
                      primary={todo.complete ? undefined : todo.label}
                      secondary={todo.complete ? todo.label : undefined}
                    />
                    <ListItemIcon onClick={() => deleteTodo(index)}>
                      <DeleteIcon
                        sx={{
                          '&:hover': { color: 'error.main' },
                          cursor: 'pointer',
                        }}
                      />
                    </ListItemIcon>
                    {todo.complete ? (
                      <ListItemIcon onClick={() => completeTodo(index)}>
                        <CheckCircleIcon
                          sx={{
                            color: 'success.main',
                          }}
                        />
                      </ListItemIcon>
                    ) : (
                      <ListItemIcon onClick={() => completeTodo(index)}>
                        <CheckCircleOutlineIcon
                          sx={{
                            '&:hover': { color: 'success.main' },
                            cursor: 'pointer',
                          }}
                        />
                      </ListItemIcon>
                    )}
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </Box>
        </Box>
      </Container>
      <FooterS className="app-footer" />
    </div>
  );
};
