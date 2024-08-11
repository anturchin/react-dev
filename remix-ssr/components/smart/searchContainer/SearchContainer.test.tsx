import { describe, test, expect, beforeEach, vi, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useNavigate } from '@remix-run/react';

import { createMockStore } from './__mocks__/mockStore';
import { SearchContainer } from './SearchContainer';

vi.mock('@remix-run/react', () => ({
  useNavigate: vi.fn(),
}));

const mockNavigate = vi.fn();

const initialState = {
  selectedItems: {
    selectedItems: [],
  },
};
const store = createMockStore(initialState);

describe('SearchContainer', () => {
  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
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
});
