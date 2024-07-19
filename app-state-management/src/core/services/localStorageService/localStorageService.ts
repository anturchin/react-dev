import { ILocalStorageService, LsKey } from './types';

export const localStorageService: ILocalStorageService = {};

localStorageService.saveQuery = (key: LsKey, query: string): void => {
  localStorage.setItem(key, query);
};

localStorageService.getQuery = (key: LsKey): string | null => {
  return localStorage.getItem(key);
};
