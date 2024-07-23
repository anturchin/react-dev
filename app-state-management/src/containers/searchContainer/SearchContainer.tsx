import { ReactNode, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { ErrorBoundary } from '../../components/smart/errorBoundary';
import { SearchBar } from '../../components/smart/searchBar';
import { SearchResults } from '../../components/smart/searchResults';
import { Spinner } from '../../components/simple/spinner';
import { SearchError } from '../../components/simple/searchError';
import { useLocalStorage } from '../../core/hooks/useLocalStorage';
import { SearchPagination } from '../../components/simple/searchPagination';
import { LsKey } from '../../core/services/localStorageService/types';
import { useFetchSearchResultsQuery } from '../../core/slices/rickAndMortyApiSlice';
import { FAILED_TO_FETCH, RESET_PAGE } from '../../core/constants';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../core/store/store';
import { setCurrentPage } from '../../core/slices/currentPageSlice';

import './SearchContainer.css';

export const SearchContainer = (): ReactNode => {
  const { page } = useParams();
  const navigate = useNavigate();

  const [valueQuery, setValueQuery] = useLocalStorage(LsKey.QUERY_KEY);
  const dispatch = useDispatch<AppDispatch>();

  const { data, isError, isFetching } = useFetchSearchResultsQuery({
    query: valueQuery,
    page: Number(page) || RESET_PAGE,
  });

  useEffect(() => {
    if (data)
      dispatch(
        setCurrentPage({
          currentPage: Number(page) || RESET_PAGE,
          results: data.results,
        })
      );
  }, [data, page, dispatch]);

  const handleSearch = (newQuery: string): void => {
    if (valueQuery === newQuery) {
      return;
    } else {
      setValueQuery(LsKey.QUERY_KEY, newQuery);
      navigate(`/search/${RESET_PAGE}`);
    }
  };

  const onPageChange = (page: number): void => {
    if (data)
      dispatch(setCurrentPage({ currentPage: page, results: data.results }));
    navigate(`/search/${page}`);
  };

  const handleDetailsClick = (id: number): void => {
    navigate(`/search/${Number(page) || RESET_PAGE}/details/${id}`);
  };

  const handleResultsClick = (): void => {
    navigate(`/search/${Number(page) || RESET_PAGE}`);
  };

  const content: ReactNode = isError ? (
    <SearchError message={FAILED_TO_FETCH} />
  ) : (
    <SearchResults
      results={data?.results || []}
      onResultClick={handleResultsClick}
      onInfoDetailsClick={handleDetailsClick}
    />
  );
  return (
    <>
      <ErrorBoundary>
        <SearchBar onSearch={handleSearch} initialQuery={valueQuery} />
        {data?.info && data.info.pages > 1 && (
          <SearchPagination
            onPageChange={onPageChange}
            currentPage={Number(page) || RESET_PAGE}
            totalPage={data.info.pages}
          />
        )}
        <div className="wrapper">
          {isFetching ? <Spinner /> : content}
          <Outlet />
        </div>
      </ErrorBoundary>
    </>
  );
};
