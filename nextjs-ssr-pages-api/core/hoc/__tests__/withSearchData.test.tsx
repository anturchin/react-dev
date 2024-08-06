import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import { render } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';

import withSearchData from '../withSearchData';
import { ResultsType } from '@/components/smart/searchContainer/types';
import { ResultPropType } from '@/components/smart/searchResults/types';
import { fetchSearchResults } from '@/core/utils/fetchUtils';

vi.mock('@/core/utils/fetchUtils', () => ({
  fetchSearchResults: vi.fn(),
}));

const MockComponent = (props: ResultsType) => (
  <div>
    {props.results?.length ? (
      props.results.map((result) => <div key={result.id}>{result.name}</div>)
    ) : (
      <div>No results</div>
    )}
  </div>
);

describe('withSearchData HOC', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Component should render correctly with search results', () => {
    const WrappedComponent = withSearchData(MockComponent).Component;

    const { container } = render(
      <WrappedComponent
        results={[{ id: 1, name: 'Test Character' }] as ResultPropType[]}
        currentPage={1}
        isError={false}
        pages={1}
      />
    );

    expect(container).toBeInTheDocument();
    expect(container.textContent).toContain('Test Character');
  });

  test('Component should render correctly with no results', () => {
    const WrappedComponent = withSearchData(MockComponent).Component;

    const { container } = render(
      <WrappedComponent results={[]} currentPage={1} isError={false} pages={1} />
    );

    expect(container).toBeInTheDocument();
    expect(container.textContent).toContain('No results');
  });

  describe('getServerSideProps', () => {
    test('fetches search results and returns as props', async () => {
      const mockResults = {
        results: [{ id: 1, name: 'Test Character' }],
        currentPage: 1,
        isError: false,
        pages: 1,
      };

      (fetchSearchResults as Mock).mockResolvedValue(mockResults);

      const context = {
        query: { page: '1', name: 'Test' },
      } as unknown as GetServerSidePropsContext;

      const { getServerSideProps } = withSearchData(MockComponent);
      const result = await getServerSideProps(context);

      expect(result).toEqual({
        props: mockResults,
      });
    });

    test('defaults page to 1 and name to empty string if not provided in query', async () => {
      const mockResults = {
        results: [{ id: 1, name: 'Test Character' }],
        currentPage: 1,
        isError: false,
        pages: 1,
      };

      (fetchSearchResults as Mock).mockResolvedValue(mockResults);

      const context = {
        query: {},
      } as unknown as GetServerSidePropsContext;

      const { getServerSideProps } = withSearchData(MockComponent);
      await getServerSideProps(context);

      expect(fetchSearchResults).toHaveBeenCalledWith(1, '');
    });
  });
});
