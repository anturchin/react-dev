import { describe, test, expect } from 'vitest';
import { stringUtils } from '../stringUtils';

describe('stringUtils', () => {
  test('trimString should remove leading and trailing spaces', () => {
    const str = 'hello ';
    const result = stringUtils.trimString!(str);

    expect(result).toEqual('hello');
  });
  test('cutString should truncate the string if it is longer than 20 characters', () => {
    const str = 'This is a very long string that needs to be cut';
    const result = stringUtils.cutString!(str);
    expect(result).toEqual('This is a very long ...');
  });

  test('cutString should not truncate the string if it is 20 characters or less', () => {
    const str = 'Short string';
    const result = stringUtils.cutString!(str);
    expect(result).toEqual('Short string');
  });
});
