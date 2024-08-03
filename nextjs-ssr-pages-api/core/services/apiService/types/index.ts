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

export type DetailsOrigin = {
  name: string;
  url: string;
};

export type DetailsLocation = DetailsOrigin;

export type DetailsCharactersType = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: DetailsOrigin;
  location: DetailsLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export interface ISearchApi {
  fetchSearchResults: (domain: string, query: string, page?: number) => Promise<ISearchResponse>;
  fetchSearchDetails: (domain: string, id: number) => Promise<DetailsCharactersType>;
}
