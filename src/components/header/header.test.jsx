import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './header';

describe('Header component', () => {
  test('renders the app name', () => {
    render(<Header pages={[]} />);

    expect(screen.getByTestId('app-header__app-name')).toHaveTextContent(
      'Demo Site'
    );
  });

  test('renders an option for each page in props.pages', () => {
    const pages = [
      { name: 'Todo', path: 'todo' },
      { name: 'Chat', path: 'chat' },
    ];
    render(<Header pages={pages} />);

    pages.forEach((page) => {
      expect(screen.getAllByText(page.name)).toHaveLength(2);
    });
  });

  test("calls the navigate prop with the page's path when the option is clicked", () => {
    const pages = [
      { name: 'Todo', path: 'todo' },
      { name: 'Chat', path: 'chat' },
    ];
    const navigateMock = jest.fn();
    render(<Header pages={pages} navigate={navigateMock} />);

    pages.forEach((page) => {
      const option = screen.getAllByText(page.name)[0];
      option.click();
      expect(navigateMock).toHaveBeenCalledWith(page.path);
    });
  });
});
