import { ChangeEvent, MouseEvent, ReactNode, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ISearchResultsProps } from './types';
import { Button } from '../../ui/button';
import { ThemeContext } from '../../../core/context/themeContext';
import { Checkbox } from '../../ui/checkbox';
import { AppDispatch, RootState } from '../../../core/store/store';
import {
  deleteSelectedItem,
  setSelectedItem,
} from '../../../core/slices/selectedItemsSlice';
import { stringUtils } from '../../../core/utils/stringUtils';

import './SearchResults.css';

export const SearchResults = (props: ISearchResultsProps): ReactNode => {
  const { results, onInfoDetailsClick, onResultClick } = props;
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch<AppDispatch>();
  const { selectedItems } = useSelector(
    (state: RootState) => state.selectedItems
  );

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    onInfoDetailsClick(id);
  };

  const handleSelectedItem = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.target.checked) {
      dispatch(setSelectedItem(Number(e.target.id)));
    } else {
      dispatch(deleteSelectedItem(Number(e.target.id)));
    }
  };

  return (
    <div className="search-results" onClick={onResultClick}>
      {Array.isArray(results) &&
        results.map((result) => (
          <div key={result.id} className={`result-item result-item-${theme}`}>
            <Checkbox
              resultId={result.id}
              checked={selectedItems.includes(result.id)}
              handleSelectedItem={handleSelectedItem}
            />
            <h3 className="person-name">{`${stringUtils.cutString?.(result.name)}`}</h3>
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
