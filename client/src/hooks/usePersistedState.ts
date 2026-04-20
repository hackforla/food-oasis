import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

export default function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const persistedState = sessionStorage.getItem(key);
    return persistedState ? (JSON.parse(persistedState) as T) : defaultValue;
  });

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}