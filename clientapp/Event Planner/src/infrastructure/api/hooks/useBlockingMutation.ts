import { UseMutationOptions } from '@tanstack/react-query';
import { useAppContext } from 'AppContext';
import { AxiosError } from 'axios';
import { useAppMutation } from 'infrastructure/api/hooks/useAppMutation';
import { IUseAppMutationOptions } from 'infrastructure/api/models/mutationOptions';

export const useBlockingMutation = <TRequest, TResponse = void, TError = void>(
  options: IUseAppMutationOptions &
    UseMutationOptions<TResponse, AxiosError<TError>, TRequest>,
) => {
  const {
    blocker: { block, unblock },
  } = useAppContext();

  const onMutate = options.onMutate;

  options.onMutate = (variables) => {
    onMutate?.(variables);
    block();
  };

  const onSettled = options.onSettled;

  options.onSettled = (data, error, variables, context) => {
    onSettled?.(data, error, variables, context);
    unblock();
  };

  const baseMutation = useAppMutation(options);

  return baseMutation;
};
