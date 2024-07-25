import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useContext } from 'react';

import { ThemeContext, ThemeContextProvider } from '../ThemeContext';
import { Theme } from '../types';

const TestComponent = () => {
  const { theme, handleChangeTheme } = useContext(ThemeContext);

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => handleChangeTheme(Theme.DARK)}>
        Change Theme
      </button>
    </div>
  );
};

describe('ThemeContextProvider', () => {
  test('should provide the initial theme', () => {
    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent(Theme.LIGHT);
  });
});
