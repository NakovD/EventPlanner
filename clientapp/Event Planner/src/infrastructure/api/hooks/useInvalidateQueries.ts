import { QueryKey, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  const invalidate = useCallback(
    (queryKey: QueryKey) =>
      queryClient.invalidateQueries(queryKey),
    [queryClient],
  );

  return invalidate;
};
