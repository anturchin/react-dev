import { describe, test, expect, beforeEach, vi, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/navigation';

import { SearchContainer } from './SearchContainer';
import { createMockStore } from '@/__mocks__/mockStore';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const mockRouter = {
  push: vi.fn(),
};

const initialState = {
  selectedItems: {
    selectedItems: [],
  },
};
const store = createMockStore(initialState);

describe('SearchContainer', () => {
  beforeEach(() => {
    (useRouter as Mock).mockReturnValue(mockRouter);
  });

  test('should render SearchBar and other elements', () => {
    render(
      <Provider store={store}>
        <SearchContainer
          results={[]}
          currentPage={1}
          pages={1}
          isError={false}
          onPageChange={() => {}}
        />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Please enter character name')).toBeInTheDocument();
  });

  test('should render SearchError when isError is true', () => {
    render(
      <Provider store={store}>
        <SearchContainer
          results={[]}
          currentPage={1}
          pages={1}
          isError={true}
          onPageChange={() => {}}
        />
      </Provider>
    );

    expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
  });
});
