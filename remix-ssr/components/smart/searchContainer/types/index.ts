import { ReactNode } from 'react';
import { ResultPropType } from '../../searchResults/types';

export type ResultsType = {
  results: ResultPropType[] | null;
  currentPage: number;
  isError: boolean;
  pages: number;
  onPageChange?: (page: number) => void;
  children?: ReactNode;
};
