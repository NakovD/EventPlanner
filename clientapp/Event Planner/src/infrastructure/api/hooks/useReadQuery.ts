import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { API } from 'infrastructure/api';
import { useErrorHandler } from 'infrastructure/api/hooks/useErrorHandler';

interface IUseReadQueryOptions {
  endpoint: string;
  queryKey: QueryKey;
}

export const useReadQuery = <TData>(
  options: IUseReadQueryOptions & UseQueryOptions<TData, AxiosError>,
) => {
  const endpoint = options.endpoint;

  const queryFn = () => API.GET<TData>(endpoint);

  const queryKey = options.queryKey;

  const query = useQuery<TData, AxiosError>(queryKey, queryFn, options);

  useErrorHandler(query.error);

  return query;
};
