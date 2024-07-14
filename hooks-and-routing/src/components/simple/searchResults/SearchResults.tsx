import { ReactNode } from 'react';

import { ISearchResultsProps } from './types';
import { Button } from '../../ui/button';

import './SearchResults.css';

export const SearchResults = (props: ISearchResultsProps): ReactNode => {
  const { results, onInfoDetailsClick, onResultClick } = props;

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();
    onInfoDetailsClick(id);
  };

  return (
    <div className="search-results" onClick={onResultClick}>
      {results.map((result) => (
        <div key={result.id} className="result-item">
          <h3 className="person-name">{result.name}</h3>
          <p className="person-gender">{result.gender}</p>
          <img className="image" src={result.image} alt="image" />
          <Button onClick={(e) => handleButtonClick(e, result.id)}>
            Info details
          </Button>
        </div>
      ))}
    </div>
  );
};
