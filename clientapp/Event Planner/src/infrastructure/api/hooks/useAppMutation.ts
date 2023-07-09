import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { API } from 'infrastructure/api';
import { useEffect } from 'react';

interface IUseAppMutationOptions {
  endpoint: string;
  queryKey?: QueryKey;
}

export const useAppMutation = <TRequest, TResponse = void, TError = void>(
  options: IUseAppMutationOptions &
    UseMutationOptions<TResponse, AxiosError<TError>, TRequest>,
) => {
  const endpoint = options.endpoint;

  const queryClient = useQueryClient();

  const mutate = (data: TRequest) => API.POST<TRequest, TResponse>(endpoint, data);

  const mutation = useMutation<TResponse, AxiosError<TError>, TRequest>(mutate, options);

  useEffect(() => {
    if (mutation.isSuccess)
      options.queryKey && queryClient.invalidateQueries(options.queryKey);
  }, [mutation.isSuccess]);

  return mutation;
};
