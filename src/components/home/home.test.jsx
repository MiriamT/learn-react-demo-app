import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from './home';

describe('Home component', () => {
  test('renders the page title', () => {
    render(<Home />);

    expect(screen.getByText('Hello!')).toBeVisible();
  });

  test('renders the page sections', () => {
    render(<Home />);

    const sections = screen
      .getAllByTestId('home__section-title')
      .map((el) => el.textContent);

    expect(sections).toEqual([
      'More about Miriam',
      'More about Coffee',
      'More about Design',
    ]);
  });

  test('renders cards about coffee', () => {
    render(<Home />);

    expect(screen.getByText('Americano')).toBeVisible();
    expect(screen.getByText('Cappuccino')).toBeVisible();
    expect(screen.getByText('Latte')).toBeVisible();
  });

  test('when the Design System accordion is clicked, it expands to show more detail', () => {
    render(<Home />);
    const googleButton = screen.queryByText('Google Material Design');
    expect(googleButton).not.toBeVisible();

    const designAccordion = screen.getByText('Design System');
    designAccordion.click();

    expect(googleButton).toBeVisible();
  });
});
