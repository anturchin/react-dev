import { Component, ReactNode } from 'react';

import { ErrorBoundary } from '../../components/ordinary/errorBoundary';
import { SearchBar } from '../../components/simple/searchBar';
import { SearchResults } from '../../components/simple/searchResults';
import { apiService } from '../../core/services/apiService';
import { SearchDataType } from '../../core/services/apiService/types';
import { localStorageService } from '../../core/services/localStorageService/localStorageService';
import { DelayDuration, ISearchContainerState } from './types';
import { Spinner } from '../../components/simple/spinner';
import { delay } from '../../core/utils/delay/delay';
import { SearchError } from '../../components/simple/seachError';

import './SearchContainer.css';
export class SearchContainer extends Component {
  state: ISearchContainerState = {
    query: localStorageService.getQuery?.() || '',
    results: [],
    isLoading: true,
    error: false,
    errorMessage: '',
  };

  componentDidMount(): void {
    this.performSearch(this.state.query);
  }

  performSearch = async (query: string): Promise<void> => {
    try {
      await delay(DelayDuration.SHORT);
      const results = (await apiService.fetchSearchResults?.(
        query
      )) as SearchDataType[];
      this.setState({
        results,
        isLoading: false,
        error: false,
      });
      localStorageService.saveQuery?.(query);
    } catch (error) {
      if (error instanceof Error) {
        this.setState({
          isLoading: false,
          error: true,
          errorMessage: error.message,
        });
        console.error('Error fetching search results:', error.message);
      }
    }
  };

  handleSearch = (query: string): void => {
    this.setState({ query, isLoading: true }, () => {
      this.performSearch(query);
    });
  };

  render(): ReactNode {
    const { results, query, isLoading, error, errorMessage } = this.state;
    const content = error ? (
      <SearchError message={errorMessage} />
    ) : (
      <SearchResults results={results} />
    );
    return (
      <ErrorBoundary>
        <div className="search-container">
          <SearchBar onSearch={this.handleSearch} initialQuery={query} />
          {isLoading ? <Spinner /> : content}
        </div>
      </ErrorBoundary>
    );
  }
}
