import { UseMutationOptions } from '@tanstack/react-query';
import { useBlockerStore } from 'AppContext';
import { AxiosError } from 'axios';
import { useAppMutation } from 'infrastructure/api/hooks/useAppMutation';
import { IUseAppMutationOptions } from 'infrastructure/api/models/mutationOptions';
import { useShallow } from 'zustand/react/shallow';

export const useBlockingMutation = <TRequest, TResponse = void, TError = void>(
  options: IUseAppMutationOptions &
    UseMutationOptions<TResponse, AxiosError<TError>, TRequest>,
) => {
  const { block, unblock } = useBlockerStore(
    useShallow((s) => ({
      block: s.block,
      unblock: s.unblock,
    })),
  );

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
