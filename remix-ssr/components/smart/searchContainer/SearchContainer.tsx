import { useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router';

import { useLocalStorage } from '../../../core/hooks/useLocalStorage';
import { LsKey } from '../../../core/services/localStorageService/types';
import { ResultsType } from './types';
import { ErrorBoundary } from '../errorBoundary';
import { SearchBar } from '../searchBar/SearchBar';
import { SearchPagination } from '../../simple/searchPagination';
import { FAILED_TO_FETCH, RESET_PAGE } from '../../../core/constants';
import { SearchError } from '../../simple/searchError';
import { SearchResults } from '../searchResults/SearchResults';
import { useScrollPosition } from '../../../core/hooks/useScrollPosition';

import styles from './SearchContainer.module.css';

export const SearchContainer = (props: ResultsType): ReactNode => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const navigate = useNavigate();

  const [valueQuery, setValueQuery] = useLocalStorage(LsKey.QUERY_KEY);

  useScrollPosition();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { results, currentPage, pages, isError, children } = props;

  const handlePageChange = (newPage: number) => {
    navigate(`/page/${newPage}`);
  };

  const handleSearch = (newQuery: string): void => {
    setValueQuery(LsKey.QUERY_KEY, newQuery);
    navigate(`/page/search?name=${newQuery}`);
  };

  const handleDetailsClick = (id: number): void => {
    navigate(`/page/${currentPage}/character/${id}`);
  };

  const handleResultsClick = (): void => {
    navigate(`/page/${currentPage || RESET_PAGE}`);
  };

  const searchResultsOrError = isError ? (
    <SearchError message={FAILED_TO_FETCH} />
  ) : (
    <SearchResults
      results={results!}
      onResultClick={handleResultsClick}
      onInfoDetailsClick={handleDetailsClick}
    />
  );

  const content = (
    <>
      <ErrorBoundary>
        <SearchBar initialQuery={valueQuery} onSearch={handleSearch} />
        {pages > 1 && (
          <SearchPagination
            onPageChange={handlePageChange}
            currentPage={currentPage}
            totalPage={pages}
          />
        )}
        <div className={`${styles['wrapper']}`}>
          {searchResultsOrError}
          {children && children}
        </div>
      </ErrorBoundary>
    </>
  );

  return <>{isClient && content}</>;
};
