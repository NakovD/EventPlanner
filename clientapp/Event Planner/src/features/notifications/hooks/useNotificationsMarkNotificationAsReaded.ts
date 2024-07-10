import { INotification } from 'features/notifications/models/notification';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useInvalidateQueries } from 'infrastructure/api/hooks/useInvalidateQueries';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

interface IUseNotificationsMarkNotificationAsReadedOptions {
  notification: INotification;
}

export const useNotificationsMarkNotificationAsReaded = ({
  notification,
}: IUseNotificationsMarkNotificationAsReadedOptions) => {
  const invalidate = useInvalidateQueries();

  const markAsReadMutation = useSnackbarBlockingMutation<void>({
    endpoint: replacePlaceholderWithId(
      endpoints.notifications.markSingleAsReaded,
      notification.id,
    ),
    queryKey: [getRequestsOptions.GetAllNotifications.queryKey],
    onSuccess: () =>
      invalidate([getRequestsOptions.GetUnreadNotificationsCount.queryKey]),
  });

  return markAsReadMutation;
};
