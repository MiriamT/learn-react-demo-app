import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Container,
  Divider,
  Input,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { FooterS, primaryColor, TitleS } from '../common/common.styles';

export const Todo = () => {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);

  function onInputChange(event) {
    setInputText(event.target.value);
  }

  function addTodo() {
    if (inputText !== '') {
      todos.push(inputText);
      setInputText('');
    }
  }

  function onInputKeyUp(event) {
    if (event.key === 'Enter') {
      addTodo();
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        height: '100%',
      }}
    >
      <Container maxWidth="lg" sx={{}}>
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
                minHeight: '16rem',
              }}
            >
              {todos.map((todo, index) => (
                <div key={index}>
                  <ListItem>
                    <ListItemText primary={todo} />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </Box>
        </Box>
      </Container>
      <div
        style={{
          height: `calc((3rem * ${
            todos.length < 6 ? 5 : 10 - todos.length
          }) - ${todos.length < 6 ? '.3rem' : '-0.3rem'})`, // fill remaining space when todo list is small
        }}
      ></div>
      <FooterS />
    </div>
  );
};
