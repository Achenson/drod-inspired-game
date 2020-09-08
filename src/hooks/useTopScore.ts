import { useState, useEffect } from "react";

// this could be rewritten so initiallValue could also be a function
function getData(key: string, initialValue: string) {
  let savedValue = localStorage.getItem(key);

  if (savedValue) {
    return savedValue;
  } else {
    return initialValue;
  }
}

export default function useTopScore(key: string, initialValue: string) {
  // function as an argument to useState -> will call getData only on first render
  // (lazy initial state)
  const [value, setValue] = useState(() => {
    return getData(key, initialValue);
  });

  useEffect(() => {
      localStorage.setItem(key, value)
  }, [key, value])


  return [value, setValue];
}
