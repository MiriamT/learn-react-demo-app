import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { App } from './App';

describe('App component', () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
    render(
      <MemoryRouter history={history}>
        <App />
      </MemoryRouter>
    );
  });

  test('renders a Header', () => {
    expect(screen.getByTestId('app-header')).toBeVisible();
  });

  test('renders the Home page by default', () => {
    expect(screen.queryByTestId('home-page')).toBeVisible();
    expect(screen.queryByTestId('todo-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('chat-page')).not.toBeInTheDocument();
  });

  test('when the Todo header option is clicked, navigates to the Todo page', () => {
    // initial conditions
    expect(screen.queryByTestId('home-page')).toBeVisible();
    expect(screen.queryByTestId('todo-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('chat-page')).not.toBeInTheDocument();

    const todoOption = screen.getAllByText('Todo')[0];
    todoOption.click();

    expect(screen.queryByTestId('home-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('todo-page')).toBeVisible();
    expect(screen.queryByTestId('chat-page')).not.toBeInTheDocument();
  });

  test('when the Chat header option is clicked, navigates to the Chat page', () => {
    // initial conditions
    expect(screen.queryByTestId('home-page')).toBeVisible();
    expect(screen.queryByTestId('todo-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('chat-page')).not.toBeInTheDocument();

    const chatOption = screen.getAllByText('Chat')[0];
    chatOption.click();

    expect(screen.queryByTestId('home-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('todo-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('chat-page')).toBeVisible();
  });

  test('when the Demo Site header title is clicked, navigates to the Home page', () => {
    // initial conditions
    const todoOption = screen.getAllByText('Todo')[0];
    todoOption.click();
    expect(screen.queryByTestId('home-page')).not.toBeInTheDocument();

    const homeOption = screen.getByTestId('app-header__app-name');
    homeOption.click();

    expect(screen.queryByTestId('home-page')).toBeVisible();
    expect(screen.queryByTestId('todo-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('chat-page')).not.toBeInTheDocument();
  });
});
