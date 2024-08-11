import { describe, test, expect, vi, afterEach, Mock } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

import { useLocalStorage } from './useLocalStorage';
import { localStorageService } from '../../services/localStorageService';
import { LsKey } from '../../services/localStorageService/types';

vi.mock('../../services/localStorageService', () => ({
  localStorageService: {
    getQuery: vi.fn(),
    saveQuery: vi.fn(),
  },
}));

const TestComponent = ({ keyProp }: { keyProp: LsKey }) => {
  const [value, handleChangeValue] = useLocalStorage(keyProp);

  return (
    <div>
      <span data-testid="value">{value}</span>
      <button onClick={() => handleChangeValue(keyProp, 'newValue')} data-testid="update-button">
        Update Value
      </button>
    </div>
  );
};

describe('useLocalStorage', () => {
  const testKey = 'testKey' as LsKey;

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should initialize with value from localStorage', () => {
    (localStorageService.getQuery as Mock).mockReturnValue('initialValue');

    const { getByTestId } = render(<TestComponent keyProp={testKey} />);

    expect(getByTestId('value').textContent).toBe('initialValue');
    expect(localStorageService.getQuery).toHaveBeenCalledWith(testKey);
  });

  test('should update value when handleChangeValue is called', () => {
    const { getByTestId } = render(<TestComponent keyProp={testKey} />);

    fireEvent.click(getByTestId('update-button'));

    expect(getByTestId('value').textContent).toBe('newValue');
    expect(localStorageService.saveQuery).toHaveBeenCalledWith(testKey, 'newValue');
  });

  test('should set value from localStorage on key change', () => {
    (localStorageService.getQuery as Mock).mockReturnValueOnce('newKeyValue');

    const { rerender } = render(<TestComponent keyProp={testKey} />);
    rerender(<TestComponent keyProp={testKey} />);

    expect(localStorageService.getQuery).toHaveBeenCalledWith(testKey);
  });
});
