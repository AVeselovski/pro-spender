import { useEffect } from "react";

import useTimeout from "./useTimeout";

const log = () => console.log("%c Bounce!", "font-weight: bold");

/**
 * Uses useTimeout hook to delay an action. Use case: "Search on type" - inputs.
 */
const useDebounce = (callback = log, delay = 1000, dependencies: any[] = []) => {
  const { reset, clear } = useTimeout(callback, delay);

  /* Reset debounce on dependency prop change */
  useEffect(reset, [...dependencies, reset]);
  /* Clear timeout initially */
  useEffect(clear, [clear]);
};

export default useDebounce;
