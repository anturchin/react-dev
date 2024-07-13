import { ReactNode, useEffect, useState } from 'react';

import { ErrorBoundary } from '../../components/ordinary/errorBoundary';
import { SearchBar } from '../../components/smart/searchBar';
import { SearchResults } from '../../components/simple/searchResults';
import { apiService } from '../../core/services/apiService';
import {
  InfoType,
  ISearchResponse,
} from '../../core/services/apiService/types';
import { DelayDuration, ResultsType } from './types';
import { Spinner } from '../../components/simple/spinner';
import { delay } from '../../core/utils/delay/delay';
import { SearchError } from '../../components/simple/searchError';
import { useLocalStorage } from '../../core/hooks/useLocalStorage';
import { SearchPagination } from '../../components/simple/searchPagination';
import { SearchDetails } from '../../components/smart/searchDetail';

import './SearchContainer.css';

const INITIAL_PAGE = 1;

export const SearchContainer = (): ReactNode => {
  const { valueQuery, handleChangeValue } = useLocalStorage();
  const [results, setResults] = useState<ResultsType[]>([]);
  const [info, setInfo] = useState<InfoType>({
    count: 0,
    pages: 0,
    next: '',
    prev: '',
  });
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    performSearch(valueQuery, currentPage);
  }, [valueQuery, currentPage]);

  const performSearch = async (query: string, page: number): Promise<void> => {
    setIsLoading(true);
    try {
      await delay(DelayDuration.SHORT);
      const { results, info } = (await apiService.fetchSearchResults?.(
        query,
        page
      )) as ISearchResponse;

      setResults(results);
      setInfo(info);
      setError(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(true);
        setErrorMessage(error.message);
        console.error('Error fetching search results:', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (newQuery: string): void => {
    if (valueQuery === newQuery) {
      return;
    } else {
      handleChangeValue(newQuery);
      setSelectedId(null);
      setCurrentPage(INITIAL_PAGE);
      setIsLoading(true);
      performSearch(newQuery, INITIAL_PAGE);
    }
  };

  const onPageChange = (page: number): void => {
    setCurrentPage(page);
    setSelectedId(null);
    setIsLoading(true);
  };

  const handleResultClick = (id: number): void => {
    setSelectedId(id);
  };

  const handleCloseDetails = (): void => {
    setSelectedId(null);
  };

  const content = error ? (
    <SearchError message={errorMessage} />
  ) : (
    <SearchResults results={results} onResultClick={handleResultClick} />
  );
  return (
    <>
      <ErrorBoundary>
        <SearchBar onSearch={handleSearch} initialQuery={valueQuery} />
        {info.pages > 1 && (
          <SearchPagination
            onPageChange={onPageChange}
            currentPage={currentPage}
            totalPage={info.pages}
          />
        )}
        <div className="wrapper">
          {isLoading ? <Spinner /> : content}
          {selectedId && (
            <SearchDetails id={selectedId} onClose={handleCloseDetails} />
          )}
        </div>
      </ErrorBoundary>
    </>
  );
};
