export type ResultsType = {
  id: number;
  name: string;
  gender: string;
  image: string;
};

export interface ISearchContainerState {
  query: string;
  results: ResultsType[];
  isLoading: boolean;
}
