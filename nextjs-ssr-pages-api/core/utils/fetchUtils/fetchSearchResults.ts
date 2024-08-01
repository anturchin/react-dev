import { ResultsType } from '@/components/smart/searchContainer/types';
import { apiService } from '@/core/services/apiService';

export const fetchSearchResults = async (page: number): Promise<ResultsType> => {
  let searchResults: ResultsType;

  try {
    const {
      info: { pages },
      results,
    } = await apiService.fetchSearchResults(process.env.BASE_URL as string, '', page);
    searchResults = { results, currentPage: page, isError: false, pages };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    searchResults = { results: null, currentPage: page, isError: true, pages: page };
  }

  return {
    ...searchResults,
  };
};
