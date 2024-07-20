import { INotification } from 'features/notifications/models/notification';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';

export const useNotificationsQuery = () =>
  useReadQuery<INotification[]>({
    endpoint: getRequestsOptions.GetAllNotifications.endpoint,
    queryKey: [getRequestsOptions.GetAllNotifications.queryKey],
  });
