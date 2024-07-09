export const enum DelayDuration {
  SHORT = 1000,
  MEDIUM = 3000,
  LONG = 5000,
  VERY_LONG = 10000,
}

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
  error: boolean;
  errorMessage: string;
}
export interface ISearchContainerProps {}
