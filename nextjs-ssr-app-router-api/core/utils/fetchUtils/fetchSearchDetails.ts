import { IDetailsCharacter } from '@/components/smart/searchDetail/types';
import { NEXT_PUBLIC_URL } from '@/core/constants';
import { apiService } from '@/core/services/apiService';

export const fetchSearchDetails = async (id: number): Promise<IDetailsCharacter> => {
  let characterDetails: IDetailsCharacter;
  try {
    const character = await apiService.fetchSearchDetails(
      process.env.NEXT_PUBLIC_URL || NEXT_PUBLIC_URL,
      id
    );
    characterDetails = { character, isError: false };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    characterDetails = { character: null, isError: true };
  }

  return {
    ...characterDetails,
  };
};
