import { ReactNode } from 'react';

import { SwitchTheme } from '@/components/simple/switchTheme';
import { SearchContainer } from '@/components/smart/searchContainer/SearchContainer';
import { fetchSearchResults } from '@/core/utils/fetchUtils';
import { Params } from '@/types';

const HomeComponent = async ({ params, children }: { params: Params; children?: ReactNode }) => {
  const page = parseInt(params.page, 10) || 1;
  const searchResults = await fetchSearchResults(page, '');

  return (
    <>
      <SwitchTheme />
      <SearchContainer {...searchResults}>{children && children}</SearchContainer>
    </>
  );
};

export default HomeComponent;
