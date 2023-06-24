import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { API } from 'infrastructure/api';
import { getQueryKey } from 'infrastructure/api/utilities/getQueryKey';

interface IUseReadQueryOptions {
  endpoint: string;
  dependentQueryKeys?: QueryKey;
}

export const useReadQuery = <TData>(
  options: IUseReadQueryOptions & UseQueryOptions<TData>,
) => {
  const endpoint = options.endpoint;

  const queryFn = () => API.GET<TData>(endpoint);

  const dependentQueryKeys = options.dependentQueryKeys;

  const defaultQueryKey = getQueryKey(endpoint);

  const finalQueryKey = [defaultQueryKey, ...(dependentQueryKeys ?? [])];

  const query = useQuery<TData>(finalQueryKey, queryFn, options);

  return query;
};
