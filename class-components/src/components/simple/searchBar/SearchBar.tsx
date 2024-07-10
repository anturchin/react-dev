import { Component, ChangeEvent, ReactNode, ContextType } from 'react';

import { stringUtils } from '../../../core/utils/stringUtils';
import { AdditionalClass, SearchBarProps, SearchBarState } from './types';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { ErrorBoundaryContext } from '../../../core/context/errorBoundaryContext/ErrorBoundaryContext';

import './SearchBar.css';

export class SearchBar extends Component<SearchBarProps, SearchBarState> {
  static contextType = ErrorBoundaryContext;
  declare context: ContextType<typeof ErrorBoundaryContext>;

  state: SearchBarState = {
    query: this.props.initialQuery,
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = (): void => {
    const trimmedQuery = stringUtils.trimString?.(this.state.query) as string;
    this.props.onSearch(trimmedQuery);
  };

  triggerError = () => {
    if (this.context) {
      this.context.triggerError();
    }
  };

  render(): ReactNode {
    return (
      <div className="search-bar">
        <h2 className="title">The Rick and Morty API</h2>
        <div className="search-wrapper" onSubmit={this.handleSubmit}>
          <Input
            placeholder={`Please enter character name`}
            value={this.state.query}
            onChange={this.handleChange}
          />
          <div className="btn-wrapper">
            <Button onClick={this.handleSubmit}>Search</Button>
            <Button
              onClick={this.triggerError}
              additionalClass={AdditionalClass.RED}
            >
              Trigger error
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
