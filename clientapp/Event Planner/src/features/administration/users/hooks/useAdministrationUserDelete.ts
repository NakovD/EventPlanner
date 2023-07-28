import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

interface IUseAdministrationUserDeleteOptions {
  userId: string;
}

export const useAdministrationUserDelete = ({
  userId,
}: IUseAdministrationUserDeleteOptions) => {
  const { mutate } = useSnackbarBlockingMutation({
    endpoint: replacePlaceholderWithId(endpoints.user.delete, userId),
    queryKey: [getRequestsOptions.GetAllUsers.queryKey],
  });

  return {
    deleteUser: () => mutate({}),
  };
};
