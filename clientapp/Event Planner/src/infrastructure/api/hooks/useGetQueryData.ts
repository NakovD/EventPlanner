import { QueryKey, useQueryClient } from '@tanstack/react-query';

export const useGetQueryData = <T>(queryKey: QueryKey) => {
  const queryClient = useQueryClient();

  const getFreshData = () => queryClient.getQueryData<T>(queryKey);

  return getFreshData;
};
