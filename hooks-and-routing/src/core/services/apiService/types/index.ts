export type SearchDataType = {
  id: number;
  name: string;
  gender: string;
  image: string;
  type: string;
  species: string;
};

export type InfoType = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};
export interface ISearchResponse {
  info: InfoType;
  results: SearchDataType[];
}
export interface ISearchApi {
  fetchSearchResults?: (
    query: string,
    page?: number
  ) => Promise<ISearchResponse>;
}
