import React, { useState, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
import { TodoActions } from '../../state/todo/reducer';
import { TodoContext } from '../../state/todo/context';

const TodoListItem = ({
  todo,
  deleteTodo,
  toggleTodo,
  innerRef,
  ...otherProps
}) => {
  return (
    <div>
      <ListItem ref={innerRef} {...otherProps} disabled={todo.complete}>
        <ListItemText primary={todo.label} />
        <ListItemIcon onClick={() => deleteTodo(todo.id)}>
          <DeleteIcon
            sx={{
              '&:hover': { color: 'error.main' },
              cursor: 'pointer',
            }}
          />
        </ListItemIcon>
        {todo.complete ? (
          <ListItemIcon onClick={() => toggleTodo(todo.id)}>
            <CheckCircleIcon
              sx={{
                color: 'success.main',
                cursor: 'pointer',
              }}
            />
          </ListItemIcon>
        ) : (
          <ListItemIcon onClick={() => toggleTodo(todo.id)}>
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
  );
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // draggableStyle must be applied to the dragging element
  ...draggableStyle,

  ...(isDragging && {
    background: '#C9E7F5',
  }),
});

const getListStyle = (isDraggingOver) => ({});

export const Todo = () => {
  const { todos, dispatch: todoDispatch } = useContext(TodoContext);
  const [inputText, setInputText] = useState('');

  function onInputChange(event) {
    setInputText(event.target.value);
  }

  function addTodo() {
    if (inputText !== '') {
      todoDispatch({
        type: TodoActions.ADD,
        todo: { label: inputText, complete: false },
      });
      setInputText('');
    }
  }

  function deleteTodo(id) {
    todoDispatch({
      type: TodoActions.DELETE,
      id,
    });
  }

  function toggleTodo(id) {
    todoDispatch({
      type: TodoActions.TOGGLE,
      id,
    });
  }

  function onInputKeyUp(event) {
    if (event.key === 'Enter') {
      addTodo();
    }
  }

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    todoDispatch({
      type: TodoActions.REORDER,
      sourceIndex: result.source.index,
      destinationIndex: result.destination.index,
    });
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
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <List
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    sx={{
                      background: 'white',
                      borderRadius: '0.4rem',
                      minHeight: '55vh',
                    }}
                  >
                    {todos.map((todo, index) => (
                      <Draggable
                        key={todo.id}
                        draggableId={todo.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <TodoListItem
                            key={index}
                            todo={todo}
                            deleteTodo={deleteTodo}
                            toggleTodo={toggleTodo}
                            innerRef={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        </Box>
      </Container>
      <FooterS className="app-footer" />
    </div>
  );
};
