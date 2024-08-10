import { ReactNode } from 'react';
import { useLoaderData } from '@remix-run/react';

import { SwitchTheme } from '../../components/simple/switchTheme';
import { SearchContainer } from '../../components/smart/searchContainer/SearchContainer';
import { ResultsType } from '../../components/smart/searchContainer/types';
import { ThemeWrapper } from '../../components/smart/themeWrapper';

export const HomeComponent = ({ children }: { children?: ReactNode }) => {
  const searchResults = useLoaderData<ResultsType>();

  return (
    <ThemeWrapper>
      <SwitchTheme />
      <SearchContainer {...searchResults}>{children}</SearchContainer>
    </ThemeWrapper>
  );
};
