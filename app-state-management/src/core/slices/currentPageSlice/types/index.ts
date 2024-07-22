import { SearchDataType } from '../../rickAndMortyApiSlice/types';

export interface ICurrentPageState {
  currentPage: number;
  results: SearchDataType[];
}
