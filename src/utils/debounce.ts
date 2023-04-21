export const debounce = <T extends (...args: any[]) => ReturnType<T>>(
  callback: T,
  delay: number
) => {
  let timeout: number;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
