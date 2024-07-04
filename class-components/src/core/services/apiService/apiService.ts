import { ISearchApi, SearchDataResponseType, SearchDataType } from "./types";

const BASE_URL = "https://rickandmortyapi.com/api/character";

export const apiService: ISearchApi = {};

apiService.fetchSearchResults = async (
  query: string,
): Promise<SearchDataType[]> => {
  const response = await fetch(`${BASE_URL}?name=${query}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = (await response.json()) as SearchDataResponseType;
  return data.results;
};
