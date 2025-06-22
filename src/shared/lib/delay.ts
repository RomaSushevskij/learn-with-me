export const delay = (ms: number = 200) => {
  const { promise, resolve } = Promise.withResolvers();
  setTimeout(resolve, ms);

  return promise;
};
