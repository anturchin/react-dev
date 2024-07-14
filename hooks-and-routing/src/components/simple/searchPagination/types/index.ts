export type PaginationPropType = {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};
