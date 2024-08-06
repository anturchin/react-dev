import { describe, test, expect, beforeEach } from 'vitest';

import { localStorageService } from '../localStorageService';
import { LsKey } from './types';

describe('localStorageService', () => {
  let store: Record<string, string> = {};

  const localStorageMock = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    key: (index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    },
    get length() {
      return Object.keys(store).length;
    },
  };

  beforeEach(() => {
    store = {};
    global.localStorage = localStorageMock;
  });

  test('saveQuery should save query to localStorage', () => {
    const query = 'test query';
    localStorageService.saveQuery(LsKey.QUERY_KEY, query);

    const savedQuery = localStorage.getItem(LsKey.QUERY_KEY);
    expect(savedQuery).toEqual(query);
  });

  test('getQuery should retrieve query from localStorage', () => {
    const query = 'test query';
    localStorage.setItem(LsKey.QUERY_KEY, query);

    const retrievedQuery = localStorageService.getQuery(LsKey.QUERY_KEY);
    expect(retrievedQuery).toEqual(query);
  });
});
