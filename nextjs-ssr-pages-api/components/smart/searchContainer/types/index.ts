import { ResultPropType } from '@/components/smart/searchResults/types';
import { ReactNode } from 'react';

export type ResultsType = {
  results: ResultPropType[];
  currentPage: number;
  isError: boolean;
  pages: number;
  onPageChange?: (page: number) => void;
  children?: ReactNode;
};
