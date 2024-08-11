import { describe, test, expect } from 'vitest';

import { delay } from './delay';

describe('delay function', () => {
  test('should resolve immediately when delay is 0', async () => {
    const start = performance.now();
    await delay(0);
    const end = performance.now();
    const duration = end - start;

    expect(duration).toBeLessThan(10);
  });
});
