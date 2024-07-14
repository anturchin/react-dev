import { BASE_URL } from '../../constants';
import { DetailsCharactersType, ISearchApi, ISearchResponse } from './types';

export const apiService: ISearchApi = {};

apiService.fetchSearchResults = async (
  query: string,
  page: number = 1
): Promise<ISearchResponse> => {
  const url = new URL(BASE_URL);

  if (query) {
    url.searchParams.append('name', query);
  }
  url.searchParams.append('page', page.toString());

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return (await response.json()) as ISearchResponse;
};

apiService.fetchSearchDetails = async (
  id: number
): Promise<DetailsCharactersType> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return (await response.json()) as DetailsCharactersType;
};
