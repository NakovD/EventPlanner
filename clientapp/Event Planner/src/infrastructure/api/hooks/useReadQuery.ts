import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { API } from 'infrastructure/api';

interface IUseReadQueryOptions {
  endpoint: string;
  queryKey: QueryKey;
}

export const useReadQuery = <TData>(
  options: IUseReadQueryOptions & UseQueryOptions<TData>,
) => {
  const endpoint = options.endpoint;

  const queryFn = () => API.GET<TData>(endpoint);

  const queryKey = options.queryKey;

  const query = useQuery<TData>(queryKey, queryFn, options);

  return query;
};
