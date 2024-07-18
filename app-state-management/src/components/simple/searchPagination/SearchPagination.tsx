import { ReactNode } from 'react';
import { PaginationPropType } from './types';
import { Button } from '../../ui/button';

import './SearchPagination.css';

export const SearchPagination = (props: PaginationPropType): ReactNode => {
  const { currentPage, totalPage, onPageChange } = props;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPage) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="pagination">
      <Button onClick={() => handlePageChange(currentPage - 1)}>prev</Button>
      <Button onClick={() => handlePageChange(currentPage + 1)}>next</Button>
    </div>
  );
};
