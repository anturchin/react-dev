import { render } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import { GetServerSidePropsContext } from 'next';

import withDetailsData from '../withDetailsData';
import { DetailsCharactersType } from '@/core/services/apiService/types';
import { fetchSearchDetails, fetchSearchResults } from '@/core/utils/fetchUtils';

vi.mock('@/core/utils/fetchUtils', () => ({
  fetchSearchResults: vi.fn(),
  fetchSearchDetails: vi.fn(),
}));

const MockComponent = () => <div>Mock Component</div>;

describe('withDetailsData HOC', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Component should render correctly', () => {
    const WrappedComponent = withDetailsData(MockComponent).Component;

    const { container } = render(
      <WrappedComponent
        searchResults={{ results: [], currentPage: 1, isError: false, pages: 1 }}
        characterDetails={{
          character: { id: 1, name: 'Test Character', image: 'image-url' } as DetailsCharactersType,
          isError: false,
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });

  describe('getServerSideProps', () => {
    test('fetches search results and character details and returns as props', async () => {
      const mockSearchResults = { results: [], currentPage: 1, isError: false, pages: 1 };
      const mockCharacterDetails = {
        character: { id: 1, name: 'Test Character', image: 'image-url' },
        isError: false,
      };

      (fetchSearchResults as Mock).mockResolvedValue(mockSearchResults);
      (fetchSearchDetails as Mock).mockResolvedValue(mockCharacterDetails);

      const context = {
        query: { page: '1', characterId: '1' },
      } as unknown as GetServerSidePropsContext;

      const { getServerSideProps } = withDetailsData(MockComponent);
      const result = await getServerSideProps(context);

      expect(result).toEqual({
        props: {
          searchResults: mockSearchResults,
          characterDetails: { ...mockCharacterDetails, currentPage: mockSearchResults.currentPage },
        },
      });
    });

    test('defaults page to 1 if not provided in query', async () => {
      const mockSearchResults = { results: [], currentPage: 1, isError: false, pages: 1 };
      const mockCharacterDetails = {
        character: { id: 1, name: 'Test Character', image: 'image-url' },
        isError: false,
      };

      (fetchSearchResults as Mock).mockResolvedValue(mockSearchResults);
      (fetchSearchDetails as Mock).mockResolvedValue(mockCharacterDetails);

      const context = {
        query: { characterId: '1' },
      } as unknown as GetServerSidePropsContext;

      const { getServerSideProps } = withDetailsData(MockComponent);
      await getServerSideProps(context);

      expect(fetchSearchResults).toHaveBeenCalledWith(1, '');
    });
  });
});
