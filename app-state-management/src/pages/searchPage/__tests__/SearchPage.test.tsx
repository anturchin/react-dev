import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { test, expect } from 'vitest';
import { SearchPage } from '../SearchPage';

test('renders SearchContainer', () => {
  const { container } = render(
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>
  );
  const wrapperElement = container.getElementsByClassName('wrapper')[0];
  expect(wrapperElement).toBeInTheDocument();
});
