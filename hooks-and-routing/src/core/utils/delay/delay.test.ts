import { describe, it, expect, vi } from 'vitest';
import { delay } from './delay';

describe('delay', () => {
  it('should resolve after the specified time', async () => {
    const ms = 100;
    const start = Date.now();

    await delay(ms);

    const end = Date.now();
    const elapsed = end - start;

    expect(elapsed).toBeGreaterThanOrEqual(ms);
    expect(elapsed).toBeLessThan(ms + 50);
  });

  it('should call resolve after the specified time', async () => {
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
