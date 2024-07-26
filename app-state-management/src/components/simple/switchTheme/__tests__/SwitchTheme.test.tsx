import { render, screen, fireEvent } from '@testing-library/react';
import { describe, vi, test, expect } from 'vitest';
import { ThemeContext } from '../../../../core/context/themeContext';
import { Theme } from '../../../../core/context/themeContext/types';
import { SwitchTheme } from '../SwitchTheme';

describe('SwitchTheme component', () => {
  const handleChangeThemeMock = vi.fn();

  const renderWithTheme = (theme: Theme) => {
    render(
      <ThemeContext.Provider
        value={{ theme, handleChangeTheme: handleChangeThemeMock }}
      >
        <SwitchTheme />
      </ThemeContext.Provider>
    );
  };

  test('renders correctly with light theme', () => {
    renderWithTheme('light' as Theme);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test('renders correctly with dark theme', () => {
    renderWithTheme('dark' as Theme);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  test('calls handleChangeTheme with correct value when toggled from light to dark', () => {
    renderWithTheme('light' as Theme);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChangeThemeMock).toHaveBeenCalledWith('dark');
  });

  test('calls handleChangeTheme with correct value when toggled from dark to light', () => {
    renderWithTheme('dark' as Theme);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChangeThemeMock).toHaveBeenCalledWith('light');
  });
});
