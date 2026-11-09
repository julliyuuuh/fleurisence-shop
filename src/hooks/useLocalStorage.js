import { useEffect, useState } from "react";

// Like useState, but the value is saved in the browser (localStorage),
// so it's still there after a refresh or tomorrow.
export function useLocalStorage(key, initialValue) {
  // The function form runs ONCE, on first load: read what was saved before.
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue; // broken or blocked storage → start fresh
    }
  });

  // Every time the value changes, save it. localStorage only stores text,
  // so JSON.stringify turns the array into text (JSON.parse turns it back).
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Private mode or storage full: the shop still works, it just won't remember.
    }
  }, [key, value]);

  return [value, setValue];
}
