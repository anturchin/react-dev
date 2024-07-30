import { ResultPropType } from '@/components/smart/searchResults/types';

export type ResultsType = {
  results: ResultPropType[];
  currentPage: number;
  isError: boolean;
  pages: number;
}