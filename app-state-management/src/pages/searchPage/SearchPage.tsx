import { ReactNode } from 'react';

import { SearchContainer } from '../../containers/searchContainer';

import './SearchPage.css';
import { SwitchTheme } from '../../components/simple/switchTheme';

export const SearchPage = (): ReactNode => {
  return (
    <>
      <SwitchTheme />
      <SearchContainer data-testid="search-container" />
    </>
  );
};
