import { ChangeEvent, ReactNode, useContext, useState } from 'react';

import { stringUtils } from '../../../core/utils/stringUtils';
import { AdditionalClass, SearchBarProps } from './types';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { ErrorBoundaryContext } from '../../../core/context/errorBoundaryContext/ErrorBoundaryContext';

import './SearchBar.css';
import { IErrorBoundaryContext } from '../../../core/context/errorBoundaryContext/types';

export const SearchBar = (props: SearchBarProps): ReactNode => {
  const context = useContext<IErrorBoundaryContext | null>(
    ErrorBoundaryContext
  );
  const [query, setQuery] = useState<string>(props.initialQuery);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleSubmit = (): void => {
    const trimmedQuery = stringUtils.trimString?.(query) as string;
    props.onSearch(trimmedQuery);
  };

  const triggerError = () => {
    if (context) {
      context.triggerError();
    }
  };

  return (
    <div className="search-bar">
      <h2 className="title">The Rick and Morty API</h2>
      <div className="search-wrapper" onSubmit={handleSubmit}>
        <Input
          placeholder={`Please enter character name`}
          value={query}
          onChange={handleChange}
        />
        <div className="btn-wrapper">
          <Button onClick={handleSubmit}>Search</Button>
          <Button onClick={triggerError} additionalClass={AdditionalClass.RED}>
            Trigger error
          </Button>
        </div>
      </div>
    </div>
  );
};
