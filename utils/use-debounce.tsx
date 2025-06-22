import { useEffect, useState } from "react";

export function useDebounce<T>(text: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(text);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(text);
    }, delay);

    return () => clearTimeout(handler);
  }, [text, delay]);

  return debouncedValue;
}
