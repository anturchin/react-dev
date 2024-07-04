import { ILocalStorageService, LsKey } from "./types";

export const localStorageService: ILocalStorageService = {};

localStorageService.saveQuery = (query: string): void => {
  localStorage.setItem(LsKey.QUERY_KEY, query);
};

localStorageService.getQuery = (): string | null => {
  return localStorage.getItem(LsKey.QUERY_KEY);
};
