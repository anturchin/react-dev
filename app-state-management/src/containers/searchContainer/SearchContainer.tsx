import { ReactNode, useCallback, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ErrorBoundary } from '../../components/smart/errorBoundary';
import { SearchBar } from '../../components/smart/searchBar';
import { SearchResults } from '../../components/simple/searchResults';
import { apiService } from '../../core/services/apiService';
import { ISearchResponse } from '../../core/services/apiService/types';
import { DelayDuration } from './types';
import { Spinner } from '../../components/simple/spinner';
import { delay } from '../../core/utils/delay/delay';
import { SearchError } from '../../components/simple/searchError';
import { useLocalStorage } from '../../core/hooks/useLocalStorage';
import { SearchPagination } from '../../components/simple/searchPagination';
import { LsKey } from '../../core/services/localStorageService/types';
import { AppDispatch, RootState } from '../../core/store/store';
import {
  changeCurrentPage,
  fetchedPage,
  fetchError,
  fetchingPage,
} from '../../core/slices/currentPageSlice';

import './SearchContainer.css';

const RESET_PAGE = 1;

export const SearchContainer = (): ReactNode => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { currentPage, results, info, isLoading, error, errorMessage } =
    useSelector((state: RootState) => state.currentPage);

  const [valueQuery, setValueQuery] = useLocalStorage(LsKey.QUERY_KEY);

  const performSearch = useCallback(
    async (query: string, page: number): Promise<void> => {
      dispatch(fetchingPage());
      try {
        await delay(DelayDuration.SHORT);
        const { results, info } = (await apiService.fetchSearchResults?.(
          query,
          page
        )) as ISearchResponse;

        dispatch(fetchedPage({ results, info, currentPage: page }));
      } catch (error) {
        if (error instanceof Error) {
          dispatch(fetchError(error.message));
          console.error('Error fetching search results:', error.message);
        }
      }
    },
    [dispatch]
  );

  useEffect(() => {
    performSearch(valueQuery, currentPage);
  }, [performSearch, valueQuery, currentPage]);

  const handleSearch = (newQuery: string): void => {
    if (valueQuery === newQuery) {
      return;
    } else {
      setValueQuery(LsKey.QUERY_KEY, newQuery);
      dispatch(changeCurrentPage(RESET_PAGE));
      performSearch(newQuery, RESET_PAGE);
      navigate(`/search/${RESET_PAGE}`);
    }
  };

  const onPageChange = (page: number): void => {
    dispatch(changeCurrentPage(page));
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
        {info && info.pages > 1 && (
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
