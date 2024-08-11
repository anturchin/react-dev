import { render, screen, fireEvent } from '@testing-library/react';
import { describe, beforeEach, test, expect, vi, Mock } from 'vitest';

import { SearchPagination } from './SearchPagination';

describe('SearchPagination', () => {
  let onPageChange: Mock;

  beforeEach(() => {
    onPageChange = vi.fn();
  });

  const setup = (currentPage: number, totalPage: number) => {
    render(
      <SearchPagination
        currentPage={currentPage}
        totalPage={totalPage}
        onPageChange={onPageChange}
      />
    );
  };

  test('renders pagination buttons', () => {
    setup(1, 10);

    expect(screen.getByText('prev')).toBeInTheDocument();
    expect(screen.getByText('next')).toBeInTheDocument();
  });

  test('calls onPageChange with correct arguments when "next" is clicked', () => {
    setup(1, 10);

    fireEvent.click(screen.getByText('next'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test('calls onPageChange with correct arguments when "prev" is clicked', () => {
    setup(2, 10);

    fireEvent.click(screen.getByText('prev'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  test('does not call onPageChange when on first page and "prev" is clicked', () => {
    setup(1, 10);

    fireEvent.click(screen.getByText('prev'));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  test('does not call onPageChange when on last page and "next" is clicked', () => {
    setup(10, 10);

    fireEvent.click(screen.getByText('next'));
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
