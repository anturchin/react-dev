import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISearchResponse, DetailsCharactersType } from './types';
import { BASE_URL } from '../../constants';

export const apiService = createApi({
  reducerPath: 'apiService',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchSearchResults: builder.query<
      ISearchResponse,
      { query: string; page: number }
    >({
      query: ({ query, page }) => ({
        url: '/',
        params: {
          name: query,
          page: page.toString(),
        },
      }),
    }),
    fetchSearchDetails: builder.query<DetailsCharactersType, number>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useFetchSearchResultsQuery, useFetchSearchDetailsQuery } =
  apiService;
