import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../core/store';
import { SearchPage } from '../SearchPage';
import { ThemeContext } from '../../../core/context/themeContext';
import { Theme } from '../../../core/context/themeContext/types';

const mockHandleChangeTheme = vi.fn();

const themeContextValue = {
  theme: 'light' as Theme,
  handleChangeTheme: mockHandleChangeTheme,
};

describe('SearchPage', () => {
  test('should render SwitchTheme and SearchContainer components and allow theme toggling', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeContext.Provider value={themeContextValue}>
            <SearchPage />
          </ThemeContext.Provider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});
