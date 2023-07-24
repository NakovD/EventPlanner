import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { API } from 'infrastructure/api';
import { IUseAppMutationOptions } from 'infrastructure/api/models/mutationOptions';

export const useAppMutation = <TRequest, TResponse = void, TError = void>(
  options: IUseAppMutationOptions &
    UseMutationOptions<TResponse, AxiosError<TError>, TRequest>,
) => {
  const endpoint = options.endpoint;

  const queryClient = useQueryClient();

  const mutate = (data: TRequest) => API.POST<TRequest, TResponse>(endpoint, data);

  const mutation = useMutation<TResponse, AxiosError<TError>, TRequest>(mutate, {
    onSuccess: (data, request, context) => {
      options?.onSuccess?.(data, request, context);
      options.queryKey && queryClient.invalidateQueries(options.queryKey);
    },
    ...options,
  });

  return mutation;
};
