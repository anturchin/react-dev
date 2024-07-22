import { ChangeEvent, MouseEvent, ReactNode, useContext } from 'react';

import { ISearchResultsProps } from './types';
import { Button } from '../../ui/button';
import { ThemeContext } from '../../../core/context/themeContext';
import { Checkbox } from '../../ui/checkbox';

import './SearchResults.css';

export const SearchResults = (props: ISearchResultsProps): ReactNode => {
  const { results, onInfoDetailsClick, onResultClick } = props;
  const { theme } = useContext(ThemeContext);

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    onInfoDetailsClick(id);
  };

  const handleSelectedItem = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    console.log(e);
  };

  return (
    <div className="search-results" onClick={onResultClick}>
      {Array.isArray(results) &&
        results.map((result) => (
          <div key={result.id} className={`result-item result-item-${theme}`}>
            <Checkbox
              resultId={result.id}
              // checked={false}
              handleSelectedItem={handleSelectedItem}
            />
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
