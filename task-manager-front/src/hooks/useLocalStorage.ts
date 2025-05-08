import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Estado inicial desde prop
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Una vez que el componente se monta, cargamos el valor desde localStorage
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  // Función para actualizar tanto el estado como localStorage
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
} 