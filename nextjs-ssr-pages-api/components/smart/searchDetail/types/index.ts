import { DetailsCharactersType } from '@/core/services/apiService/types';

export const enum AdditionalClass {
  RED = 'red',
}

export interface IDetailsCharacter {
  character: DetailsCharactersType;
  isError: boolean;
}
