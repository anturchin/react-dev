import { describe, test, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import withSearchData from '../withSearchData';
import { ResultsType } from '@/components/smart/searchContainer/types';
import { ResultPropType } from '@/components/smart/searchResults/types';

vi.mock('../utils/fetchUtils', () => ({
  fetchSearchResults: vi.fn(),
}));

const MockComponent = (props: ResultsType) => (
  <div>
    {props.results?.length ? (
      props.results.map((result: any) => <div key={result.id}>{result.name}</div>)
    ) : (
      <div>No results</div>
    )}
  </div>
);

describe('withSearchData HOC', () => {
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
});
