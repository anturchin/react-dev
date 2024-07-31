import { render, screen, fireEvent } from '@testing-library/react';
import { describe, vi, test, expect, beforeAll, afterAll } from 'vitest';

import { ThemeContext } from '@/core/context/themeContext';
import { Theme } from '@/core/context/themeContext/types';
import { Modal } from './Modal';

describe('Modal component', () => {
  const deselectItemsMock = vi.fn();
  const blob = new Blob(['test content'], { type: 'text/csv;charset=utf-8;' });
  const filename = 'test.csv';
  const count = 3;

  const renderWithTheme = (theme: Theme) => {
    render(
      <ThemeContext.Provider
        value={{ theme: theme, handleChangeTheme: () => {} }}
      >
        <Modal
          deselectItems={deselectItemsMock}
          filename={filename}
          blob={blob}
          count={count}
        />
      </ThemeContext.Provider>
    );
  };

  const createObjectURL = function (this: void): string {
    return 'mocked-url';
  } as typeof URL.createObjectURL;

  let originalCreateObjectURL: typeof URL.createObjectURL;

  beforeAll(() => {
    originalCreateObjectURL = createObjectURL;
    URL.createObjectURL = vi.fn().mockReturnValue('mocked-url');
  });

  afterAll(() => {
    URL.createObjectURL = originalCreateObjectURL;
  });

  test('renders correctly with light theme', () => {
    renderWithTheme('light' as Theme);
    expect(screen.getByText(/selected items: 3/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /deselect all/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /load/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /load/i })).toHaveAttribute(
      'download',
      filename
    );
  });

  test('renders correctly with dark theme', () => {
    renderWithTheme('dark' as Theme);
    expect(screen.getByText(/selected items: 3/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /deselect all/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /load/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /load/i })).toHaveAttribute(
      'download',
      filename
    );
  });

  test('calls deselectItems when deselect all button is clicked', () => {
    renderWithTheme('light' as Theme);
    fireEvent.click(screen.getByRole('button', { name: /deselect all/i }));
    expect(deselectItemsMock).toHaveBeenCalled();
  });

  test('has correct href attribute for the download link', () => {
    renderWithTheme('light' as Theme);
    const downloadLink = screen.getByRole('link', { name: /load/i });
    expect(downloadLink).toHaveAttribute('href', 'mocked-url');
  });
});
