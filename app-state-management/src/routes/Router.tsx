import { ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from './routes';

export const Router = (): ReactNode => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
