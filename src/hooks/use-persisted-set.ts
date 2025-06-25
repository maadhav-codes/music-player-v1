import { useLocalStorage, useSet } from '@uidotdev/usehooks';
import { useEffect, useMemo } from 'react';

export function usePersistedSet(key: string, initialValue: string[] = []) {
  const [storedValue, setStoredValue] = useLocalStorage<unknown>(
    key,
    initialValue
  );

  const initialArray = useMemo(() => {
    try {
      if (Array.isArray(storedValue)) {
        return storedValue.filter(item => typeof item === 'string');
      }
      return initialValue;
    } catch {
      return initialValue;
    }
  }, [storedValue, initialValue]);

  const set = useSet<string>(initialArray);

  useEffect(() => {
    setStoredValue([...set.values()]);
  }, [set, setStoredValue]);

  return set;
}
