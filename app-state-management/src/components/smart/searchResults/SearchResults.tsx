import { ChangeEvent, MouseEvent, ReactNode, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ISearchResultsProps } from './types';
import { Button } from '../../ui/button';
import { ThemeContext } from '../../../core/context/themeContext';
import { Checkbox } from '../../ui/checkbox';
import { AppDispatch, RootState } from '../../../core/store/store';
import {
  clearSelectedItems,
  deleteSelectedItem,
  setSelectedItem,
} from '../../../core/slices/selectedItemsSlice';
import { stringUtils } from '../../../core/utils/stringUtils';
import { Modal } from '../../simple/modal/Modal';
import { generateCSV } from '../../../core/utils/csvUtils/csvUtils';

import './SearchResults.css';

export const SearchResults = (props: ISearchResultsProps): ReactNode => {
  const { results, onInfoDetailsClick, onResultClick } = props;
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch<AppDispatch>();
  const { selectedItems } = useSelector(
    (state: RootState) => state.selectedItems
  );

  const handleButtonClick = (
    e: MouseEvent<HTMLButtonElement>,
    id: number
  ): void => {
    e.stopPropagation();
    onInfoDetailsClick(id);
  };

  const handleSelectedItem = (e: ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    const item = results.find((item) => item.id === Number(e.target.id));
    if (e.target.checked) {
      if (item) dispatch(setSelectedItem({ ...item }));
    } else {
      if (item) dispatch(deleteSelectedItem({ ...item }));
    }
  };

  const deselectItems = (): void => {
    dispatch(clearSelectedItems());
  };

  const checkedItem = (id: number): boolean => {
    const item = selectedItems.find((item) => item.id === id);
    if (item) return true;
    return false;
  };

  const generateFileName = () => `${selectedItems.length}_items.csv`;

  const getBlob = (): Blob => {
    return generateCSV(
      selectedItems.map((item) => ({
        id: item.id,
        gender: item.gender,
        image: item.image,
        name: item.name,
      }))
    );
  };

  return (
    <>
      <div className="search-results" onClick={onResultClick}>
        {Array.isArray(results) &&
          results.map((result) => (
            <div key={result.id} className={`result-item result-item-${theme}`}>
              <Checkbox
                resultId={result.id}
                checked={checkedItem(result.id)}
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
      {selectedItems.length > 0 && (
        <Modal
          filename={generateFileName()}
          blob={getBlob()}
          deselectItems={deselectItems}
          count={selectedItems.length}
        />
      )}
    </>
  );
};
