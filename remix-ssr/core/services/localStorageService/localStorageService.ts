import { ILocalStorageService, LsKey } from './types';

export const localStorageService: ILocalStorageService = {
  saveQuery: (key: LsKey, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  getQuery: (key: LsKey): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
};
