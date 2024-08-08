'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { SearchResults } from '@/components/smart/searchResults';
import { SearchPagination } from '@/components/simple/searchPagination';
import { FAILED_TO_FETCH, RESET_PAGE } from '@/core/constants';
import { SearchError } from '@/components/simple/searchError';
import { SearchBar } from '@/components/smart/searchBar/SearchBar';
import { ErrorBoundary } from '@/components/smart/errorBoundary';
import { ResultsType } from './types';
import { useLocalStorage } from '@/core/hooks/useLocalStorage';
import { LsKey } from '@/core/services/localStorageService/types';

import styles from './SearchContainer.module.css';

export const SearchContainer = (props: ResultsType): JSX.Element => {
  const router = useRouter();

  const [valueQuery, setValueQuery] = useLocalStorage(LsKey.QUERY_KEY);

  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { results, currentPage, pages, isError, children } = props;

  const handlePageChange = (newPage: number) => {
    router.push(`/page/${newPage}`, { scroll: false });
  };

  const handleSearch = (newQuery: string): void => {
    setValueQuery(LsKey.QUERY_KEY, newQuery);
    router.push(`/page/search?name=${newQuery}`, { scroll: false });
  };

  const handleDetailsClick = (id: number): void => {
    router.push(`/page/${currentPage}/character/${id}`, { scroll: false });
  };

  const handleResultsClick = (): void => {
    router.push(`/page/${currentPage || RESET_PAGE}`, { scroll: false });
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
