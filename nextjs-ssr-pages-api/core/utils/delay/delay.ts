export const delay = (ms: number): Promise<unknown> => {
  return new Promise((resolve: (v?: unknown) => void) => {
    const timerId = setTimeout(() => {
      resolve();
      clearTimeout(timerId);
    }, ms);
  });
};