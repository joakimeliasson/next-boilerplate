import { useState, useRef, useEffect, SetStateAction, Dispatch } from "react";

const useBrowserStorage = <T>(
  key: string,
  initialState?: T,
  storage: "localStorage" | "sessionStorage" = "localStorage"
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    if (process.browser) {
      const jsonInStorage = window[storage]?.getItem(key);
      if (jsonInStorage) {
        return JSON.parse(jsonInStorage);
      }
    }
    return initialState;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window[storage].removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window[storage].setItem(key, JSON.stringify(state));
  }, [key, state, storage]);

  return [state, setState];
};

export default useBrowserStorage;
