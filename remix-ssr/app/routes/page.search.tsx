import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { fetchSearchResults } from '../../core/utils/fetchUtils';
import { HomeComponent } from '../components/HomePage';
import { SearchContainer } from '../../components/smart/searchContainer/SearchContainer';
import { ResultsType } from '../../components/smart/searchContainer/types';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const name = url.searchParams.get('name') || '';

  const searchResults = await fetchSearchResults(1, name);

  return json(searchResults);
};

export default function SearchPage() {
  const searchResults = useLoaderData<ResultsType>();

  return (
    <HomeComponent>
      <SearchContainer {...searchResults}>
        <></>
      </SearchContainer>
    </HomeComponent>
  );
}
