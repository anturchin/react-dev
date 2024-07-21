export interface IResults {
  id: number;
  name: string;
  gender: string;
  image: string;
}

export interface IInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface ICurrentPageState {
  results: IResults[];
  info: IInfo;
  currentPage: number;
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
}
