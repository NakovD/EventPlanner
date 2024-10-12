import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toaster } from 'features/common/toaster/toaster';
import { useBlockingMutation } from 'infrastructure/api/hooks/useBlockingMutation';
import { IUseAppMutationOptions } from 'infrastructure/api/models/mutationOptions';

interface ISnackBarBlockingMutationOptions extends IUseAppMutationOptions {
  snackbarMessage?: string;
}

export const useSnackbarBlockingMutation = <TRequest, TResponse = void, TError = void>(
  options: ISnackBarBlockingMutationOptions &
    UseMutationOptions<TResponse, AxiosError<TError>, TRequest>,
) => {
  const onSuccess = options.onSuccess;

  options.onSuccess = (data, variables, context) => {
    onSuccess?.(data, variables, context);
    toaster.showSuccess(options.snackbarMessage);
  };

  const onError = options.onError;

  options.onError = (error, variables, context) => {
    onError?.(error, variables, context);
    toaster.showError(options.snackbarMessage);
  };

  const mutation = useBlockingMutation(options);

  return mutation;
};
