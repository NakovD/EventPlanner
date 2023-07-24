import { useCallback, useState } from 'react';

export const useBlocker = () => {
  const [isAppBlocked, setIsAppBlocked] = useState(false);

  const block = useCallback(() => setIsAppBlocked(true), []);

  const unblock = useCallback(() => setIsAppBlocked(false), []);

  return {
    isBlocking: isAppBlocked,
    block,
    unblock,
  };
};
