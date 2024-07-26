import { SearchDetails } from '../components/smart/searchDetail';
import { NotFound } from '../pages/404';
import { SearchPage } from '../pages/searchPage';
import { RoutesType } from './types';

export const routes: RoutesType[] = [
  {
    path: '/',
    element: <SearchPage />,
    errorElement: <NotFound />,
  },
  {
    path: '/search/:page',
    element: <SearchPage />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'details/:id',
        element: <SearchDetails />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
