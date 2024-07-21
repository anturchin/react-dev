import { DetailsCharactersType } from '../../../services/apiService/types';

export interface IDetails extends DetailsCharactersType {}

export interface IDetailsState {
  details: IDetails | null;
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
}
