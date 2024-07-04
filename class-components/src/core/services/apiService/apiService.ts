import { SearchDataType, ISearchResponseApi } from "./types";

export const apiService: ISearchResponseApi = {};

apiService.fetchSearchResults = async (
  query: string,
): Promise<SearchDataType[]> => {
  const response = await fetch(`https://api.example.com/search?q=${query}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return (await response.json()) as SearchDataType[];
};
