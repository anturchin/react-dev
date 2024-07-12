import { ISearchApi, SearchDataResponseType, SearchDataType } from './types';

const BASE_URL = 'https://rickandmortyapi.com/api/character';
const PAGES_NUMBER = '1';

export const apiService: ISearchApi = {};

apiService.fetchSearchResults = async (
  query: string
): Promise<SearchDataType[]> => {
  const url = new URL(BASE_URL);

  if (query) {
    url.searchParams.append('name', query);
    url.searchParams.append('pages', PAGES_NUMBER);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = (await response.json()) as SearchDataResponseType;
  return data.results;
};
