import { IDetailsCharacter } from '../../../components/smart/searchDetail/types';
import { apiService } from '../../services/apiService';
import { NEXT_PUBLIC_URL } from '../../constants';

export const fetchSearchDetails = async (id: number): Promise<IDetailsCharacter> => {
  let characterDetails: IDetailsCharacter;
  try {
    const character = await apiService.fetchSearchDetails(NEXT_PUBLIC_URL, id);
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
