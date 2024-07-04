export const enum LsKey {
  QUERY_KEY = "searchQuery",
}

export interface ILocalStorageService {
  saveQuery?: (query: string) => void;
  getQuery?: () => string | null;
}
