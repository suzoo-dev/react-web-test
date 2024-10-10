import { useEffect, useRef } from "react";

export const useRunOnUnmount = <T extends () => unknown>(callback: T) => {
  const callbackRef = useRef<T>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      callbackRef.current();
    };
  }, []);
};
