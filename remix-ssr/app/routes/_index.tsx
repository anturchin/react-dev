import { json, LoaderFunction } from '@remix-run/node';

import { fetchSearchResults } from '../../core/utils/fetchUtils';
import { HomeComponent } from '../components/HomePage';

export const loader: LoaderFunction = async ({ params }) => {
  const page = parseInt(params.page || '1', 10);
  const searchResults = await fetchSearchResults(page, '');
  return json(searchResults);
};

export default function IndexRoute() {
  return <HomeComponent />;
}
