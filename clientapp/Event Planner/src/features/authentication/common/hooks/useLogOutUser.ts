import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';

export const useLogOutUserQuery = () => {
  const mutation = useSnackbarBlockingMutation<void, void>({
    endpoint: endpoints.identity.logout,
  });

  const handleLogoutOnServer = () => mutation.mutate();

  return { handleLogoutOnServer };
};
