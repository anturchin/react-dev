import { ReactNode, useContext } from 'react';

import { ISearchResultsProps } from './types';
import { Button } from '../../ui/button';

import './SearchResults.css';
import { ThemeContext } from '../../../core/context/themeContext';

export const SearchResults = (props: ISearchResultsProps): ReactNode => {
  const { results, onInfoDetailsClick, onResultClick } = props;
  const { theme } = useContext(ThemeContext);

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();
    onInfoDetailsClick(id);
  };

  return (
    <div className="search-results" onClick={onResultClick}>
      {Array.isArray(results) &&
        results.map((result) => (
          <div key={result.id} className={`result-item result-item-${theme}`}>
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
