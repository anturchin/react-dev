import { useContext } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ThemeContext } from '@/core/context/themeContext';
import { ImageSize, ISearchResultsProps } from './types';

import styles from './SearchResults.module.css';

export const SearchResults = (props: ISearchResultsProps): JSX.Element => {
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
    <div className={`${styles['search-results']}`} onClick={onResultClick}>
      {results.map((result) => (
        <div
          key={result.id}
          className={`${styles['result-item']} ${styles[`result-item-${theme}`]}`}
        >
          <Checkbox
            resultId={result.id}
            checked={false}
            handleSelectedItem={() => {}}
          />
          <h3 className={`${styles['person-name']}`}>{result.name}</h3>
          <p className={`${styles['person-gender']}`}>{result.gender}</p>
          <Image
            className={`${styles['image']}`}
            src={result.image}
            width={ImageSize.WIDTH}
            height={ImageSize.HEIGHT}
            priority={true}
            alt="image"
          />
          <Button onClick={(e) => handleButtonClick(e, result.id)}>
            Info details
          </Button>
        </div>
      ))}
    </div>
  );
};
