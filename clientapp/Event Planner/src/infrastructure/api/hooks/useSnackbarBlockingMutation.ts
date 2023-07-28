import { UseMutationOptions } from '@tanstack/react-query';
import { useAppContext } from 'AppContext';
import { AxiosError } from 'axios';
import { useBlockingMutation } from 'infrastructure/api/hooks/useBlockingMutation';
import { IUseAppMutationOptions } from 'infrastructure/api/models/mutationOptions';

interface ISnackBarBlockingMutationOptions extends IUseAppMutationOptions {
  snackbarMessage?: string;
}

export const useSnackbarBlockingMutation = <TRequest, TResponse = void, TError = void>(
  options: ISnackBarBlockingMutationOptions &
    UseMutationOptions<TResponse, AxiosError<TError>, TRequest>,
) => {
  const {
    snackBar: { openSnackBar },
  } = useAppContext();

  const onSuccess = options.onSuccess;

  options.onSuccess = (data, variables, context) => {
    onSuccess?.(data, variables, context);
    openSnackBar('success', options?.snackbarMessage);
  };

  const onError = options.onError;

  options.onError = (error, variables, context) => {
    onError?.(error, variables, context);
    openSnackBar('error', options?.snackbarMessage);
  };

  const mutation = useBlockingMutation(options);

  return mutation;
};
