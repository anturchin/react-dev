import { ReactNode } from 'react';

import { SearchContainer } from '../../containers/searchContainer';
import { SwitchTheme } from '../../components/simple/switchTheme';

import './SearchPage.css';

export const SearchPage = (): ReactNode => {
  return (
    <>
      <SwitchTheme />
      <SearchContainer data-testid="search-container" />
    </>
  );
};
