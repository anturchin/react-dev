import { describe, test, expect, beforeEach, vi, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useNavigate } from '@remix-run/react';

import { createMockStore } from './__mocks__/mockStore';
import { SearchContainer } from './SearchContainer';
import { useLocalStorage } from '../../../core/hooks/useLocalStorage';
import { LsKey } from '../../../core/services/localStorageService/types';

vi.mock('@remix-run/react', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../../../core/hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn(),
}));

vi.mock('../../../core/hooks/useScrollPosition', () => ({
  useScrollPosition: vi.fn(),
}));

const mockNavigate = vi.fn();
const mockSetValueQuery = vi.fn();
const initialState = {
  selectedItems: {
    selectedItems: [],
  },
};
const store = createMockStore(initialState);

describe('SearchContainer', () => {
  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useLocalStorage as Mock).mockReturnValue([null, mockSetValueQuery]);
  });

  test('should render SearchBar and other elements', () => {
    render(
      <Provider store={store}>
        <SearchContainer results={[]} currentPage={1} pages={1} isError={false} />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Please enter character name')).toBeInTheDocument();
  });

  test('should render SearchError when isError is true', () => {
    render(
      <Provider store={store}>
        <SearchContainer results={[]} currentPage={1} pages={1} isError={true} />
      </Provider>
    );

    expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
  });

  test('should call navigate on search', async () => {
    render(
      <Provider store={store}>
        <SearchContainer results={[]} currentPage={1} pages={1} isError={false} />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Please enter character name'), {
      target: { value: 'Morty' },
    });

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(mockSetValueQuery).toHaveBeenCalledWith(LsKey.QUERY_KEY, 'Morty');
      expect(mockNavigate).toHaveBeenCalledWith('/page/search?name=Morty');
    });
  });

  test('should call navigate on details click', () => {
    render(
      <Provider store={store}>
        <SearchContainer
          results={[{ id: 1, name: 'Rick', gender: '', image: '' }]}
          currentPage={1}
          pages={1}
          isError={false}
        />
      </Provider>
    );

    fireEvent.click(screen.getByText('Rick'));

    expect(mockNavigate).toHaveBeenCalledWith('/page/1');
  });

  test('should set isClient to true after mount', () => {
    const { rerender } = render(
      <Provider store={store}>
        <SearchContainer results={[]} currentPage={1} pages={1} isError={false} />
      </Provider>
    );

    rerender(
      <Provider store={store}>
        <SearchContainer results={[]} currentPage={1} pages={1} isError={false} />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Please enter character name')).toBeInTheDocument();
  });

  test('should call setValueQuery from useLocalStorage', async () => {
    render(
      <Provider store={store}>
        <SearchContainer results={[]} currentPage={1} pages={1} isError={false} />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Please enter character name'), {
      target: { value: 'Summer' },
    });

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(mockSetValueQuery).toHaveBeenCalledWith(LsKey.QUERY_KEY, 'Summer');
    });
  });

  test('should render SearchPagination when pages > 1', () => {
    render(
      <Provider store={store}>
        <SearchContainer results={[]} currentPage={1} pages={2} isError={false} />
      </Provider>
    );

    expect(screen.getByText('prev')).toBeInTheDocument();
  });
});
