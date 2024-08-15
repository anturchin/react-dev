import { createBrowserRouter } from 'react-router-dom';
import { FormControlled, FormUncontrolled, Main } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: 'controlled-form',
        element: <FormControlled />,
      },
      {
        path: 'uncontrolled-form',
        element: <FormUncontrolled />,
      },
    ],
  },
]);
