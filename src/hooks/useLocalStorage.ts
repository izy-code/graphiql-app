import { useCallback } from 'react';

import type { LocalStorageKeys } from '@/common/enums';

export const LOCAL_STORAGE_KEY = 'graphiql-adventurers-team';

export function getLocalStorage<T>(): Record<string, T> {
  const item = localStorage.getItem(LOCAL_STORAGE_KEY);
  return item ? (JSON.parse(item) as Record<string, T>) : {};
}

export function useLocalStorage<T>(): {
  getStoredValue: (key: LocalStorageKeys) => T | null;
  setStoredValue: (key: LocalStorageKeys, value: T) => void;
} {
  const getStoredValue = useCallback((key: LocalStorageKeys): T | null => getLocalStorage<T>()[key] ?? null, []);

  const setStoredValue = useCallback((key: LocalStorageKeys, value: T) => {
    let localStorageMap = getLocalStorage<T>();

    localStorageMap = { ...localStorageMap, [key]: value };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localStorageMap));
  }, []);

  return { getStoredValue, setStoredValue };
}
