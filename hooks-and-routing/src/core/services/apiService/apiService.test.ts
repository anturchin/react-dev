import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { apiService } from './apiService';
import { ISearchResponse, DetailsCharactersType } from './types';

const mockFetch = (response: Response) => {
  return vi.fn().mockImplementation(() => Promise.resolve(response));
};

describe('apiService', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetchSearchResults should return search results', async () => {
    const mockResponse: ISearchResponse = {
      results: [
        {
          id: 1,
          name: 'Character 1',
          gender: 'man',
          image: '',
          type: '',
          species: '',
        },
      ],
      info: { count: 1, pages: 1, next: '', prev: '' },
    };
    const query = 'Character';
    const page = 1;
    const mockFetchResponse = new Response(JSON.stringify(mockResponse), {
      status: 200,
      headers: { 'Content-type': 'application/json' },
    });

    global.fetch = mockFetch(mockFetchResponse);

    const result = await apiService.fetchSearchResults!(query, page);
    expect(result).toEqual(mockResponse);
  });

  it('fetchSearchResults should throw an error for non-ok response', async () => {
    const query = 'Character';
    const page = 1;
    const mockFetchResponse = new Response(null, { status: 500 });

    global.fetch = mockFetch(mockFetchResponse);

    await expect(apiService.fetchSearchResults!(query, page)).rejects.toThrow(
      'Network response was not ok'
    );
  });

  it('fetchSearchDetails should return character details', async () => {
    const mockResponse: DetailsCharactersType = {
      id: 1,
      name: 'Character 1',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'http://example.com/image.jpg',
      episode: [],
      url: 'http://example.com',
      created: '2024-07-14T12:00:00.000Z',
    };
    const id = 1;
    const mockFetchResponse = new Response(JSON.stringify(mockResponse), {
      status: 200,
      headers: { 'Content-type': 'application/json' },
    });

    global.fetch = mockFetch(mockFetchResponse);

    const result = await apiService.fetchSearchDetails!(id);
    expect(result).toEqual(mockResponse);
  });

  it('fetchSearchDetails should throw an error for non-ok response', async () => {
    const id = 1;
    const mockFetchResponse = new Response(null, { status: 500 });

    global.fetch = mockFetch(mockFetchResponse);

    await expect(apiService.fetchSearchDetails!(id)).rejects.toThrow(
      'Network response was not ok'
    );
  });
});
