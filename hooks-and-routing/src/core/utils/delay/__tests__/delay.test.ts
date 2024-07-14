import { describe, test, expect, vi } from 'vitest';
import { delay } from '../delay';

describe('delay', () => {
  test('should resolve after the specified time', async () => {
    const ms = 100;
    const start = Date.now();

    await delay(ms);

    const end = Date.now();
    const elapsed = end - start;

    const tolerance = 20;

    expect(elapsed).toBeGreaterThanOrEqual(ms - tolerance);
    expect(elapsed).toBeLessThan(ms + 50);
  });

  test('should call resolve after the specified time', async () => {
    const ms = 100;
    const resolve = vi.fn();

    const testPromise = new Promise<void>((resolveOuter) => {
      const originalResolve = resolveOuter;
      delay(ms).then(() => {
        resolve();
        originalResolve();
      });
    });

    await testPromise;

    expect(resolve).toHaveBeenCalled();
  });
});
