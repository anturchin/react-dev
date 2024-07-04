export type ResultsType = {
  title: string;
  description: string;
};

export interface ISearchContainerState {
  query: string;
  results: ResultsType[];
}
