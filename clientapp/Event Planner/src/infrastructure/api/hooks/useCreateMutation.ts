import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { API } from 'infrastructure/api';

interface IUseCreateMutationOptions {
  endpoint: string;
}

export const useCreateMutation = <TRequest, TResponse = void, TError = void>(
  options: IUseCreateMutationOptions &
    UseMutationOptions<TResponse, AxiosError<TError>, TRequest>,
) => {
  const endpoint = options.endpoint;

  const mutate = (data: TRequest) => API.POST<TRequest, TResponse>(endpoint, data);

  const mutation = useMutation<TResponse, AxiosError<TError>, TRequest>(mutate, options);

  return mutation;
};
