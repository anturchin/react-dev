import { IDetailsCharacter } from '@/components/smart/searchDetail/types';
import { apiService } from '@/core/services/apiService';

export const fetchSearchDetails = async (id: number): Promise<IDetailsCharacter> => {
  const result = await apiService.fetchSearchDetails(process.env.BASE_URL as string, id);

  return {
    character: result,
    isError: false,
  };
};
