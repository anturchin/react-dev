import { describe, test, expect, vi, Mock } from 'vitest';

import { fetchSearchResults } from '../fetchUtils';
import { apiService } from '@/core/services/apiService';

vi.mock('@/core/services/apiService', () => ({
  apiService: {
    fetchSearchResults: vi.fn(),
  },
}));

describe('fetchSearchResults', () => {
  test('should return search results when api call is successful', async () => {
    const mockResults = [
      { id: 1, name: 'Character 1', image: 'image-url-1', gender: 'Male' },
      { id: 2, name: 'Character 2', image: 'image-url-2', gender: 'Female' },
    ];

    const mockResponse = {
      info: { pages: 5 },
      results: mockResults,
    };

    (apiService.fetchSearchResults as Mock).mockResolvedValue(mockResponse);

    const result = await fetchSearchResults(1, 'Test Character');

    expect(result).toEqual({
      results: mockResults,
      currentPage: 1,
      isError: false,
      pages: 5,
    });
  });

  test('should return error object when api call fails', async () => {
    (apiService.fetchSearchResults as Mock).mockRejectedValue(new Error('Test error'));

    const result = await fetchSearchResults(1, 'Test Character');

    expect(result).toEqual({
      results: null,
      currentPage: 1,
      isError: true,
      pages: 1,
    });
  });
});
