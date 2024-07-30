export type SearchDataType = {
  id: number;
  name: string;
  gender: string;
  image: string;
  type: string;
  species: string;
};

export interface ICurrentPageState {
  currentPage: number;
  results: SearchDataType[];
}