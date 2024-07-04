import { Component, ChangeEvent, FormEvent, ReactNode } from "react";

import { stringUtils } from "../../../core/utils/stringUtils";
import { SearchBarProps, SearchBarState } from "./types";

import "./SearchBar.css";

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
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}
