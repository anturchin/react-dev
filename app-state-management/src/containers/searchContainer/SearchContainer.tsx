import { ReactNode, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { ErrorBoundary } from '../../components/smart/errorBoundary';
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
import { LsKey } from '../../core/services/localStorageService/types';

import './SearchContainer.css';

const INITIAL_PAGE = 1;

export const SearchContainer = (): ReactNode => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();

  const [valueQuery, setValueQuery] = useLocalStorage(LsKey.QUERY_KEY);
  const [results, setResults] = useState<ResultsType[]>([]);
  const [info, setInfo] = useState<InfoType>({
    count: 0,
    pages: 0,
    next: '',
    prev: '',
  });
  const [currentPage, setCurrentPage] = useState<number>(
    Number(page) || INITIAL_PAGE
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
      setValueQuery(LsKey.QUERY_KEY, newQuery);
      setCurrentPage(INITIAL_PAGE);
      setIsLoading(true);
      performSearch(newQuery, INITIAL_PAGE);
      navigate(`/search/${INITIAL_PAGE}`);
    }
  };

  const onPageChange = (page: number): void => {
    setCurrentPage(page);
    setIsLoading(true);
    navigate(`/search/${page}`);
  };

  const handleDetailsClick = (id: number) => {
    navigate(`/search/${currentPage}/details/${id}`);
  };

  const handleResultsClick = (): void => {
    navigate(`/search/${currentPage}`);
  };

  const content = error ? (
    <SearchError message={errorMessage} />
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
          <Outlet />
        </div>
      </ErrorBoundary>
    </>
  );
};
