import { SearchResults } from '@/components/smart/searchResults';
import { SearchPagination } from '@/components/simple/searchPagination';
import { FAILED_TO_FETCH } from '@/core/constants';
import { SearchError } from '@/components/simple/searchError';
import { SearchBar } from '@/components/smart/searchBar/SearchBar';
import { ErrorBoundary } from '@/components/smart/errorBoundary';
import { ResultsType } from './types';

import styles from './SearchContainer.module.css';

export const SearchContainer = (props: ResultsType): JSX.Element => {
  const { results, currentPage, pages, isError, onPageChange } = props;

  const handleSearch = (newQuery: string): void => {
    console.log(newQuery);
  };

  const handleDetailsClick = (id: number) => {
    console.log(id);
  };

  const handleResultsClick = (): void => {
    console.log('handleResultsClick');
  };

  const content = isError ? (
    <SearchError message={FAILED_TO_FETCH} />
  ) : (
    <SearchResults
      results={results}
      onResultClick={handleResultsClick}
      onInfoDetailsClick={handleDetailsClick}
    />
  );
  return (
    <>
      <ErrorBoundary>
        <SearchBar onSearch={handleSearch} />
        {pages > 1 && (
          <SearchPagination
            onPageChange={onPageChange}
            currentPage={currentPage}
            totalPage={pages}
          />
        )}
        <div className={`${styles['wrapper']}`}>{content}</div>
      </ErrorBoundary>
    </>
  );
};
