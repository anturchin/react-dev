import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { NotFound } from '../NotFound';

describe('NotFound', () => {
  test('displays the text "404: Page not found"', () => {
    render(<NotFound />);
    const notFoundElement = screen.getByText('404: Page not found');
    expect(notFoundElement).toBeInTheDocument();
  });

  test('correctly applies the CSS class "not-found"', () => {
    render(<NotFound />);
    const notFoundElement = screen.getByText('404: Page not found');
    expect(notFoundElement).toHaveClass('not-found');
  });
});
