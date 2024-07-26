import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';

export const useHeaderUserNotificationsCountQuery = () =>
  useReadQuery<number>({
    endpoint: getRequestsOptions.GetUnreadNotificationsCount.endpoint,
    queryKey: [getRequestsOptions.GetUnreadNotificationsCount.queryKey],
  });
