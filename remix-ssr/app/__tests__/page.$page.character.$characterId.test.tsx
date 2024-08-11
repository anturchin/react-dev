import { describe, test, expect, vi, Mock } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useLoaderData, useNavigate } from '@remix-run/react';

import CharacterRoute from '../routes/page.$page.character.$characterId';

vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual<typeof import('@remix-run/react')>('@remix-run/react');
  return {
    ...actual,
    useLoaderData: vi.fn(),
    useNavigate: vi.fn(),
  };
});

describe('CharacterRoute Component', () => {
  test('should render SearchDetails with the correct data', () => {
    const mockData = {
      currentPage: 2,
      characterDetails: { id: 1, name: 'Test Character' },
    };

    (useLoaderData as Mock).mockReturnValue(mockData);
    const navigateMock = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigateMock);

    const { getByText } = render(<CharacterRoute />);

    expect(getByText('Close')).toBeInTheDocument();
  });
});
