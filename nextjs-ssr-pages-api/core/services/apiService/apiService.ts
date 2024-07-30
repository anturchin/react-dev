import { DetailsCharactersType, ISearchApi, ISearchResponse } from './types';

export const apiService: ISearchApi = {
  
  fetchSearchResults: async (
    domain: string,
    query: string,
    page: number = 1
  ): Promise<ISearchResponse> => {
    const url = new URL(domain);
  
    if (query) {
      url.searchParams.append('name', query);
    }
    url.searchParams.append('page', page.toString());
  
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return (await response.json()) as ISearchResponse;
  },

  fetchSearchDetails: async (
    domain: string,
    id: number
  ): Promise<DetailsCharactersType> => {
    const response = await fetch(`${domain}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return (await response.json()) as DetailsCharactersType;
  },

};
