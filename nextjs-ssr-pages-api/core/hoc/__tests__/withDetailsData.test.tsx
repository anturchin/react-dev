import { render } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import withDetailsData from '../withDetailsData';
import { DetailsCharactersType } from '@/core/services/apiService/types';

vi.mock('../utils/fetchUtils', () => ({
  fetchSearchResults: vi.fn(),
  fetchSearchDetails: vi.fn(),
}));

const MockComponent = () => <div>Mock Component</div>;

describe('withDetailsData HOC', () => {
  test('Component should render correctly', () => {
    const WrappedComponent = withDetailsData(MockComponent).Component;

    const { container } = render(
      <WrappedComponent
        searchResults={{ results: [], currentPage: 1, isError: false, pages: 1 }}
        characterDetails={{
          character: { id: 1, name: 'Test Character', image: 'image-url' } as DetailsCharactersType,
          isError: false,
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});
