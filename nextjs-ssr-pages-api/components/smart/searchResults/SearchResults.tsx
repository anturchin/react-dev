import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, MouseEvent, useContext } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ThemeContext } from '@/core/context/themeContext';
import { ImageSize, ISearchResultsProps } from './types';
import { stringUtils } from '@/core/utils/stringUtils';
import { AppDispatch, AppState } from '@/core/store/store';
import { setSelectedItem, deleteSelectedItem, clearSelectedItems } from '@/core/store/slices';
import { generateCSV } from '@/core/utils/csvUtils';
import { Modal } from '@/components/simple/modal';
import { useScrollPosition } from '@/core/hooks/useScrollPosition';

import styles from './SearchResults.module.css';

export const SearchResults = (props: ISearchResultsProps): JSX.Element => {
  const { results, onInfoDetailsClick, onResultClick } = props;
  const { theme } = useContext(ThemeContext);

  useScrollPosition();

  const dispatch = useDispatch<AppDispatch>();
  const { selectedItems } = useSelector((state: AppState) => state.selectedItems);

  const generateFileName = () => `${selectedItems.length}_character.csv`;

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

  const deselectItems = (): void => {
    dispatch(clearSelectedItems());
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

  const checkedItem = (id: number): boolean => {
    const item = selectedItems.find((item) => item.id === id);
    if (item) return true;
    return false;
  };

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>, id: number): void => {
    e.stopPropagation();
    onInfoDetailsClick(id);
  };

  const setClassNames = (id: number): string => {
    let classNames: string = `${styles['result-item']} ${styles[`result-item-${theme}`]}`;
    if (checkedItem(id)) {
      classNames += ` ${styles['checked']}`;
    }
    return classNames;
  };

  const content = (
    <>
      <div className={`${styles['search-results']}`} onClick={onResultClick}>
        {results.map((result) => (
          <div key={result.id} className={setClassNames(result.id)}>
            <Checkbox
              resultId={result.id}
              checked={checkedItem(result.id)}
              handleSelectedItem={handleSelectedItem}
            />
            <h3
              className={`${styles['person-name']}`}
            >{`${stringUtils.cutString?.(result.name)}`}</h3>
            <p className={`${styles['person-gender']}`}>{result.gender}</p>
            <Image
              className={`${styles['image']}`}
              src={result.image}
              width={ImageSize.WIDTH}
              height={ImageSize.HEIGHT}
              placeholder="blur"
              blurDataURL={result.image}
              alt="image"
            />
            <Button onClick={(e) => handleButtonClick(e, result.id)}>Info details</Button>
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

  return content;
};
