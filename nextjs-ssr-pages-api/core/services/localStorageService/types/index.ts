export const enum LsKey {
  QUERY_KEY = 'searchQuery',
  THEME = 'theme',
  SELECTED_ITEMS = 'selectedItems',
}

export interface ILocalStorageService {
  saveQuery?: (key: LsKey, query: string) => void;
  getQuery?: (key: LsKey) => string | null;
}