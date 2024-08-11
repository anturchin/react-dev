import { ResultsType } from '../../../components/smart/searchContainer/types';
import { apiService } from '../../services/apiService';
import { NEXT_PUBLIC_URL } from '../../constants';

export const fetchSearchResults = async (
  page: number,
  characterName: string
): Promise<ResultsType> => {
  let searchResults: ResultsType;

  try {
    const {
      info: { pages },
      results,
    } = await apiService.fetchSearchResults(NEXT_PUBLIC_URL, characterName, page);
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
