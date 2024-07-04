import { Component, ReactNode } from "react";

import { ISearchResultsProps } from "./types";

import "./SearchResults.css";

export class SearchResults extends Component<ISearchResultsProps> {
  render(): ReactNode {
    const { results } = this.props;
    return (
      <div className="search-results">
        {results.map((result, index) => (
          <div key={index} className="result-item">
            <h3>{result.title}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    );
  }
}
