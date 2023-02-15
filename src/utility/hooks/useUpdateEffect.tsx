import React, { useEffect, useRef } from 'react';

export function useUpdateEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList | undefined
): void {
  const runOnlyOnUpdate = useRef(false);
  useEffect(() => {
    if (runOnlyOnUpdate.current) effect();
    return () => {
      runOnlyOnUpdate.current = true;
    };
  }, deps);
}
