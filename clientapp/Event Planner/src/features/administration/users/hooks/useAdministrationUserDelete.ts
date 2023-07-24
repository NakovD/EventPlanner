import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useBlockingMutation } from 'infrastructure/api/hooks/useBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

interface IUseAdministrationUserDeleteOptions {
  userId: string;
}

export const useAdministrationUserDelete = ({
  userId,
}: IUseAdministrationUserDeleteOptions) => {
  const { mutate } = useBlockingMutation({
    endpoint: replacePlaceholderWithId(endpoints.user.delete, userId),
    queryKey: [getRequestsOptions.GetAllUsers.queryKey],
  });

  return {
    deleteUser: () => mutate({}),
  };
};
