import { ReactNode } from 'react';

import { SwitchTheme } from '@/components/simple/switchTheme';
import { SearchContainer } from '@/components/smart/searchContainer/SearchContainer';
import { fetchSearchResults } from '@/core/utils/fetchUtils';
import { Params } from '@/types';

export interface IURLSearchParams extends URLSearchParams {
  name: string;
}

const HomeComponent = async ({
  searchParams,
  params,
  children,
}: {
  searchParams: IURLSearchParams;
  params: Params;
  children?: ReactNode;
}) => {
  const page = parseInt(params.page, 10) || 1;
  const query = searchParams?.name ? searchParams.name : '';
  const searchResults = await fetchSearchResults(page, query);

  return (
    <>
      <SwitchTheme />
      <SearchContainer {...searchResults}>{children && children}</SearchContainer>
    </>
  );
};

export default HomeComponent;
