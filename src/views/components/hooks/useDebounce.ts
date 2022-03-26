import { useEffect } from "react";

import useTimeout from "./useTimeout";

function log() {
  console.log("%c Bounce!", "font-weight: bold");
}

/**
 * Uses useTimeout hook to delay an action. Use case: "Search on type" - inputs.
 */
function useDebounce(callback = log, delay = 1000, dependencies: any[] = []) {
  const { reset, clear } = useTimeout(callback, delay);

  // reset debounce on dependency prop change
  useEffect(reset, [...dependencies, reset]);
  // clear timeout initially
  useEffect(clear, [clear]);
}

export default useDebounce;
