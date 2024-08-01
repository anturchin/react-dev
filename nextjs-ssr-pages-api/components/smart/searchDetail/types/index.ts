import { DetailsCharactersType } from '@/core/services/apiService/types';

export const enum AdditionalClass {
  RED = 'red',
}

export const enum ImageSizeDetails {
  WIDTH = 400,
  HEIGHT = 500,
}

export interface IDetailsCharacter {
  character: DetailsCharactersType | null;
  isError: boolean;
  currentPage?: number;
}
