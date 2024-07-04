import { Component, ReactNode } from "react";

import { ISearchResultsProps } from "./types";

import "./SearchResults.css";

export class SearchResults extends Component<ISearchResultsProps> {
  render(): ReactNode {
    const { results } = this.props;
    return (
      <div className="search-results">
        {results.map((result) => (
          <div key={result.id} className="result-item">
            <h3>{result.name}</h3>
            <p>{result.gender}</p>
            <img src={result.image} alt="image" />
          </div>
        ))}
      </div>
    );
  }
}
