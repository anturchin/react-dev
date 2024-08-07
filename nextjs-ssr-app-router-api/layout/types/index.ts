import { ResultsType } from '@/components/smart/searchContainer/types';
import { DetailsCharactersType } from '@/core/services/apiService/types';

export type CharacterProps = {
  character: DetailsCharactersType | null;
  isError: boolean;
};

export type LayoutCharacterProps = {
  searchResults: ResultsType;
  characterDetails: CharacterProps;
};
