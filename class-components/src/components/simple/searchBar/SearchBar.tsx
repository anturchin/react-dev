import { Component, ChangeEvent, FormEvent, ReactNode } from 'react';

import { stringUtils } from '../../../core/utils/stringUtils';
import { SearchBarProps, SearchBarState } from './types';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

import './SearchBar.css';

export class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = {
    query: this.props.initialQuery,
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const trimmedQuery = stringUtils.trimString?.(this.state.query) as string;
    this.props.onSearch(trimmedQuery);
  };

  render(): ReactNode {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <Input
          placeholder={`Please enter character name`}
          value={this.state.query}
          onChange={this.handleChange}
        />
        <Button>Search</Button>
      </form>
    );
  }
}
