import { ReactNode, useEffect, useState } from 'react';

import { ErrorBoundary } from '../../components/ordinary/errorBoundary';
import { SearchBar } from '../../components/simple/searchBar';
import { SearchResults } from '../../components/simple/searchResults';
import { apiService } from '../../core/services/apiService';
import { SearchDataType } from '../../core/services/apiService/types';
import { DelayDuration, ResultsType } from './types';
import { Spinner } from '../../components/simple/spinner';
import { delay } from '../../core/utils/delay/delay';
import { SearchError } from '../../components/simple/searchError';
import { useLocalStorage } from '../../core/hooks/useLocalStorage';

import './SearchContainer.css';

export const SearchContainer = (): ReactNode => {
  const { valueQuery, handleChangeValue } = useLocalStorage();
  const [results, setResults] = useState<ResultsType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    performSearch(valueQuery);
  }, [valueQuery]);

  const performSearch = async (query: string): Promise<void> => {
    try {
      await delay(DelayDuration.SHORT);
      const results = (await apiService.fetchSearchResults?.(
        query
      )) as SearchDataType[];

      setResults(results);
      setIsLoading(false);
      setError(false);
    } catch (error) {
      if (error instanceof Error) {
        setIsLoading(false);
        setError(true);
        setErrorMessage(error.message);
        console.error('Error fetching search results:', error.message);
      }
    }
  };

  const handleSearch = (newQuery: string): void => {
    if (valueQuery === newQuery) {
      return;
    } else {
      handleChangeValue(newQuery);
      setIsLoading(true);
      performSearch(newQuery);
    }
  };

  const content = error ? (
    <SearchError message={errorMessage} />
  ) : (
    <SearchResults results={results} />
  );
  return (
    <>
      <ErrorBoundary>
        <SearchBar onSearch={handleSearch} initialQuery={valueQuery} />
        {isLoading ? <Spinner /> : content}
      </ErrorBoundary>
    </>
  );
};
