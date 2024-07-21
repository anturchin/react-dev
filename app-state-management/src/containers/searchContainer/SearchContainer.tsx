import { ReactNode } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { ErrorBoundary } from '../../components/smart/errorBoundary';
import { SearchBar } from '../../components/smart/searchBar';
import { SearchResults } from '../../components/simple/searchResults';
import { Spinner } from '../../components/simple/spinner';
import { SearchError } from '../../components/simple/searchError';
import { useLocalStorage } from '../../core/hooks/useLocalStorage';
import { SearchPagination } from '../../components/simple/searchPagination';
import { LsKey } from '../../core/services/localStorageService/types';
import { apiService } from '../../core/services/apiService';

import './SearchContainer.css';

const RESET_PAGE = 1;

export const SearchContainer = (): ReactNode => {
  const { page } = useParams();
  const navigate = useNavigate();

  const [valueQuery, setValueQuery] = useLocalStorage(LsKey.QUERY_KEY);

  const { data, isError, isFetching } = apiService.useFetchSearchResultsQuery({
    query: valueQuery,
    page: Number(page) || RESET_PAGE,
  });

  const handleSearch = (newQuery: string): void => {
    if (valueQuery === newQuery) {
      return;
    } else {
      setValueQuery(LsKey.QUERY_KEY, newQuery);
      navigate(`/search/${RESET_PAGE}`);
    }
  };

  const onPageChange = (page: number): void => {
    navigate(`/search/${page}`);
  };

  const handleDetailsClick = (id: number) => {
    navigate(`/search/${Number(page) || RESET_PAGE}/details/${id}`);
  };

  const handleResultsClick = (): void => {
    navigate(`/search/${Number(page) || RESET_PAGE}`);
  };

  const content = isError ? (
    <SearchError message="Failed to fetch data" />
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
