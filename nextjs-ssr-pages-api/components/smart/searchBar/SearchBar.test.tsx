import { render, fireEvent, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

import { ErrorBoundaryContext } from '@/core/context/errorBoundaryContext';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  test('updates the input value when changed', () => {
    render(<SearchBar initialQuery="" onSearch={() => {}} />);

    const inputElement = screen.getByPlaceholderText(
      'Please enter character name'
    );
    fireEvent.change(inputElement, { target: { value: 'Rick' } });

    expect(inputElement).toHaveValue('Rick');
  });

  test('calls the onSearch function with a truncated value when submitting', () => {
    const onSearchMock = vi.fn();
    render(<SearchBar initialQuery="" onSearch={onSearchMock} />);

    const inputElement = screen.getByPlaceholderText(
      'Please enter character name'
    );
    fireEvent.change(inputElement, { target: { value: 'Rick ' } });
    fireEvent.click(screen.getByText('Search'));

    expect(onSearchMock).toHaveBeenCalledWith('Rick');
  });

  test('calls the triggerError function when the "Trigger error" button is clicked', () => {
    const triggerErrorMock = vi.fn();
    const errorBoundaryContextMock = {
      triggerError: triggerErrorMock,
    };

    render(
      <ErrorBoundaryContext.Provider value={errorBoundaryContextMock}>
        <SearchBar initialQuery="" onSearch={() => {}} />
      </ErrorBoundaryContext.Provider>
    );

    fireEvent.click(screen.getByText('Trigger error'));

    expect(triggerErrorMock).toHaveBeenCalledTimes(1);
  });
});