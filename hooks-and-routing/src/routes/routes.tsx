import { NotFound } from '../pages/404';
import { SearchPage } from '../pages/searchPage';
import { RoutesType } from './types';

export const routes: RoutesType[] = [
  {
    path: '/',
    element: <SearchPage />,
    errorElement: <NotFound />,
  },
];
