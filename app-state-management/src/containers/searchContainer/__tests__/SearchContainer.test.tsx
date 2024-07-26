import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SearchContainer } from '..';
import { store } from '../../../core/store';

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
