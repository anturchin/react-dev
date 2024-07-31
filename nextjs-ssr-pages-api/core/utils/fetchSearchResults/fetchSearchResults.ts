import { ResultsType } from '@/components/smart/searchContainer/types';
import { apiService } from '@/core/services/apiService';

export const fetchSearchResults = async (
  page: number
): Promise<ResultsType> => {
  const {
    info: { pages },
    results,
  } = await apiService.fetchSearchResults(
    process.env.BASE_URL as string,
    '',
    page
  );

  return {
    results,
    currentPage: page,
    isError: false,
    pages,
  };
};
