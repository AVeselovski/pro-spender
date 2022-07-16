import { useCallback, useEffect, useRef } from "react";

/**
 * Sets timeout on initial load. Can reset and clear manually.
 */
const useTimeout = (callback = () => {}, delay = 1000) => {
  const callbackRef = useRef(() => {});
  const timeoutRef = useRef<undefined | NodeJS.Timeout>();

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  return { reset, clear };
};

export default useTimeout;
