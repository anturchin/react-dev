import { describe, it, expect } from 'vitest';
import { stringUtils } from './stringUtils';

describe('stringUtils', () => {
  it('trimString should remove leading and trailing spaces', () => {
    const str = 'hello ';
    const result = stringUtils.trimString!(str);

    expect(result).toEqual('hello');
  });
});
