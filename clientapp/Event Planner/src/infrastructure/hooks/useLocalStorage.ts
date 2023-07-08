import { useCallback } from 'react';

export const useLocalStorage = () => {
  const getItem = useCallback(<T>(key: string) => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item) as unknown as T;
  }, []);

  const setItem = useCallback(
    (key: string, value: unknown) => localStorage.setItem(key, JSON.stringify(value)),
    [],
  );

  const deleteItem = useCallback((key: string) => localStorage.removeItem(key), []);

  return {
    getItem,
    setItem,
    deleteItem,
  };
};
