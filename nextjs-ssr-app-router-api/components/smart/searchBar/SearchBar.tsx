import { ChangeEvent, useContext, useState } from 'react';

import { stringUtils } from '@/core/utils/stringUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ErrorBoundaryContext } from '@/core/context/errorBoundaryContext/ErrorBoundaryContext';
import { IErrorBoundaryContext } from '@/core/context/errorBoundaryContext/types';
import { AdditionalClass, SearchBarProps } from './types';

import styles from './SearchBar.module.css';

export const SearchBar = (props: SearchBarProps): JSX.Element => {
  const context = useContext<IErrorBoundaryContext | null>(ErrorBoundaryContext);
  const [query, setQuery] = useState<string>(props.initialQuery || '');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleSubmit = (): void => {
    const trimmedQuery = stringUtils.trimString?.(query) as string;
    props.onSearch(trimmedQuery);
  };

  const triggerError = (): void => {
    if (context) {
      context.triggerError();
    }
  };

  return (
    <div className={`${styles['search-bar']}`}>
      <h2 className={`${styles['title']}`}>The Rick and Morty API</h2>
      <div className={`${styles['search-wrapper']}`} onSubmit={handleSubmit}>
        <Input placeholder={`Please enter character name`} value={query} onChange={handleChange} />
        <div className={`${styles['btn-wrapper']}`}>
          <Button onClick={handleSubmit}>Search</Button>
          <Button onClick={triggerError} additionalClass={AdditionalClass.RED}>
            Trigger error
          </Button>
        </div>
      </div>
    </div>
  );
};
