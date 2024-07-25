import { vi, describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SearchContainer } from '..';
import { store } from '../../../core/store';

vi.mock('../../core/slices/rickAndMortyApiSlice', () => ({
  useFetchSearchResultsQuery: vi.fn().mockReturnValue({
    data: { results: [], info: { pages: 1 } },
    isError: false,
    isFetching: false,
  }),
}));

vi.mock('../../core/hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn().mockReturnValue(['', vi.fn()]),
}));

describe('SearchContainer', () => {
  test('should render SearchBar and other elements', () => {
    const router = createMemoryRouter(
      [{ path: '/search/:page', element: <SearchContainer /> }],
      {
        initialEntries: ['/search/1'],
      }
    );

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    expect(
      screen.getByPlaceholderText('Please enter character name')
    ).toBeInTheDocument();

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
