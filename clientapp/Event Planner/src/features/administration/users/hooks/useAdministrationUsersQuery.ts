import { IAdminUser } from 'features/administration/users/models/adminUser';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';

export const useAdministrationUsersQuery = () =>
  useReadQuery<IAdminUser[]>({
    endpoint: getRequestsOptions.GetAllUsers.endpoint,
    queryKey: [getRequestsOptions.GetAllUsers.queryKey],
  });
