import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoProvider } from '../../state/todo/context';
import { Todo } from './todo';

const todoItemTestId = 'todo__todo-item';
const incompleteCheckIconSelector =
  '[data-testId="todo-item__not-completed-icon"]';
const completedCheckIconSelector = '[data-testId="todo-item__completed-icon"]';
const deleteIconSelector = '[data-testId="todo-item__delete-icon"]';

describe('Todo component', () => {
  test("when a task title is typed into the input box and the 'add' button is clicked, a new todo item is added to the list", () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );
    expect(getTasks()).toEqual([]); // initial condition

    addTask('walk dog');
    expect(getTasks()).toEqual(['walk dog']);
  });

  test("when no text is typed into the input box and the 'add' button is clicked, a todo item is not added to the list ", () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );
    expect(getTasks()).toEqual([]); // initial condition

    // no text is typed
    const addButton = screen.getByLabelText('add-task');
    addButton.click();
    expect(getTasks()).toEqual([]); // no task is added
  });

  test('all added todo items are shown in a list', () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );
    expect(getTasks()).toEqual([]); // initial condition

    addTask('walk dog');
    addTask('make dinner');
    addTask('finish homework');
    expect(getTasks()).toEqual(['walk dog', 'make dinner', 'finish homework']);
  });

  test("when a todo item's check icon is clicked, the item is marked complete", () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );
    addTask('walk dog');
    expect(getTasks()).toEqual(['walk dog']); // initial condition

    const todoItemEl = getTask('walk dog');
    const incompleteCheckIcon = todoItemEl.querySelector(
      incompleteCheckIconSelector
    );
    incompleteCheckIcon.click();

    expect(todoItemEl.querySelector(incompleteCheckIconSelector)).toBe(null); // incomplete check disappears when complete
    expect(todoItemEl.querySelector(completedCheckIconSelector)).toBeVisible(); // completed check appears
    expect(getTasks()).toEqual(['walk dog']); // task still there
  });

  test("when a completed todo item's check icon is clicked, the item is marked uncomplete", () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );
    addTask('walk dog');
    expect(getTasks()).toEqual(['walk dog']); // initial condition

    const todoItemEl = getTask('walk dog');
    const incompleteCheckIcon = todoItemEl.querySelector(
      incompleteCheckIconSelector
    );
    incompleteCheckIcon.click();
    expect(todoItemEl.querySelector(incompleteCheckIconSelector)).toBe(null); // incomplete check is gone

    const completedCheckIcon = todoItemEl.querySelector(
      completedCheckIconSelector
    );
    expect(completedCheckIcon).toBeVisible(); // initial condition, has completed check

    completedCheckIcon.click();
    expect(todoItemEl.querySelector(incompleteCheckIconSelector)).toBeVisible(); // incomplete check appears again
    expect(todoItemEl.querySelector(completedCheckIconSelector)).toBe(null); // completed check disappears
    expect(getTasks()).toEqual(['walk dog']); // task still there
  });

  test("when a todo item's delete icon is clicked, the item is deleted from the list", () => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );
    addTask('walk dog');
    addTask('make dinner');
    expect(getTasks()).toEqual(['walk dog', 'make dinner']); // initial condition

    const todoItemEl = getTask('walk dog');
    const deleteIcon = todoItemEl.querySelector(deleteIconSelector);
    deleteIcon.click();

    expect(getTasks()).toEqual(['make dinner']); // 'walk dog' task was removed
  });
});

/**
 * Adds a task in the test environment.
 *
 * @param title name of the task to add
 */
function addTask(title) {
  const inputEl = screen.getByPlaceholderText('enter task');
  userEvent.type(inputEl, title);
  const addButton = screen.getByLabelText('add-task');
  addButton.click();
}

/**
 * Gets all the tasks in the test environment.
 */
function getTasks() {
  const todoItemEls = screen.queryAllByTestId(todoItemTestId);
  return todoItemEls.map((el) => el.textContent);
}

/**
 * Gets a todo item that matches the task title.
 */
function getTask(title) {
  const todoItemEls = screen.queryAllByTestId(todoItemTestId);
  return todoItemEls.find((el) => el.textContent === title);
}
