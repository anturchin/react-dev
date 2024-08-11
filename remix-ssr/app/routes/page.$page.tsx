import { json, LoaderFunction } from '@remix-run/node';

import { fetchSearchResults } from '../../core/utils/fetchUtils';
import { HomeComponent } from '~/components/HomePage';

export const loader: LoaderFunction = async ({ params }) => {
  const page = parseInt(params.page || '1', 10);
  console.log(page);
  const searchResults = await fetchSearchResults(page, '');
  return json(searchResults);
};

export default function PageRoute() {
  return <HomeComponent />;
}
