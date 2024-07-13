import { BASE_URL } from '../../constants';
import { ISearchApi, ISearchResponse } from './types';

export const apiService: ISearchApi = {};

apiService.fetchSearchResults = async (
  query: string,
  page: number = 1
): Promise<ISearchResponse> => {
  const url = new URL(BASE_URL);

  if (query) {
    url.searchParams.append('name', query);
  }

  url.searchParams.append('pages', page.toString());

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return (await response.json()) as ISearchResponse;
};
