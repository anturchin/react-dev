import { json, LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import { fetchSearchResults } from '../../core/utils/fetchUtils';
import { HomeComponent } from '~/components/HomePage';
import { SearchContainer } from '../../components/smart/searchContainer/SearchContainer';
import { ResultsType } from '../../components/smart/searchContainer/types';

export const loader: LoaderFunction = async ({ params }) => {
  const page = parseInt(params.page || '1', 10);
  const searchResults = await fetchSearchResults(page, '');
  return json(searchResults);
};

export default function PageRoute() {
  const searchResults = useLoaderData<ResultsType>();

  return (
    <HomeComponent>
      <SearchContainer {...searchResults}>
        <Outlet />
      </SearchContainer>
    </HomeComponent>
  );
}
