import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { vi, describe, beforeAll, Mock, beforeEach, it, expect } from 'vitest';
import { localStorageService } from '../../../services/localStorageService/localStorageService';
import { useLocalStorage } from '../useLocalStorage';
import { LsKey } from '../../../services/localStorageService/types';

vi.mock('../../services/localStorageService/localStorageService');

describe('useLocalStorage', () => {
  const mockGetQuery = vi.fn();
  const mockSaveQuery = vi.fn();

  beforeAll(() => {
    (localStorageService.getQuery as Mock) = mockGetQuery;
    (localStorageService.saveQuery as Mock) = mockSaveQuery;
  });

  beforeEach(() => {
    mockGetQuery.mockClear();
    mockSaveQuery.mockClear();
  });

  it('should initialize with value from localStorageService', () => {
    mockGetQuery.mockReturnValue('test query');
    const { result } = renderHook(() => useLocalStorage(LsKey.QUERY_KEY));

    expect(result.current[0]).toBe('test query');
    expect(mockGetQuery).toHaveBeenCalledTimes(1);
  });

  it('should update value and call localStorageService.saveQuery', () => {
    const { result } = renderHook(() => useLocalStorage(LsKey.QUERY_KEY));

    act(() => {
      result.current[1](LsKey.QUERY_KEY, 'new query');
    });

    expect(result.current[0]).toEqual('new query');
    expect(mockSaveQuery).toHaveBeenCalledWith(LsKey.QUERY_KEY, 'new query');
  });
});
