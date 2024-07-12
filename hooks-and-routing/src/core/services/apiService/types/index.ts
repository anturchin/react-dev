export type SearchDataType = {
  id: number;
  name: string;
  gender: string;
  image: string;
};

export type SearchDataResponseType = {
  results: SearchDataType[];
};

export interface ISearchApi {
  fetchSearchResults?: (query: string) => Promise<SearchDataType[]>;
}
