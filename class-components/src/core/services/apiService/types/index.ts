export type SearchDataType = {
  title: string;
  description: string;
};

export interface ISearchResponseApi {
  fetchSearchResults?: (query: string) => Promise<SearchDataType[]>;
}
