import { describe, test, expect, vi, Mock } from 'vitest';

import { fetchSearchDetails } from '../fetchUtils';
import { apiService } from '@/core/services/apiService';

vi.mock('@/core/services/apiService', () => ({
  apiService: {
    fetchSearchDetails: vi.fn(),
  },
}));

describe('fetchSearchResults', () => {
  test('should return characters when api call is successful', async () => {
    const mockCharacter = {
      id: 1,
      name: 'Test Character',
      image: 'test-image-url',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
    };

    (apiService.fetchSearchDetails as Mock).mockResolvedValue(mockCharacter);

    const result = await fetchSearchDetails(1);

    expect(result).toEqual({ character: mockCharacter, isError: false });
  });

  test('should return error object when api call fails', async () => {
    (apiService.fetchSearchDetails as Mock).mockRejectedValue(new Error('Test error'));

    const result = await fetchSearchDetails(1);

    expect(result).toEqual({ character: null, isError: true });
  });
});
