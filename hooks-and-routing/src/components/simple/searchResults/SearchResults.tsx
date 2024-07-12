import { ReactNode } from 'react';

import { ISearchResultsProps } from './types';

import './SearchResults.css';

export const SearchResults = (props: ISearchResultsProps): ReactNode => {
  const { results } = props;
  return (
    <div className="search-results">
      {results.map((result) => (
        <div key={result.id} className="result-item">
          <h3 className="person-name">{result.name}</h3>
          <p className="person-gender">{result.gender}</p>
          <img className="image" src={result.image} alt="image" />
        </div>
      ))}
    </div>
  );
};
