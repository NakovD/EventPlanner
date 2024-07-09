import { INotification } from 'features/notifications/models/notification';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useInvalidateQueries } from 'infrastructure/api/hooks/useInvalidateQueries';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

interface IUseNotificationsDeleteNotificationOptions {
  notification: INotification;
}

export const useNotificationsDeleteNotification = ({
  notification,
}: IUseNotificationsDeleteNotificationOptions) => {
  const invalidate = useInvalidateQueries();

  const deleteMutation = useSnackbarBlockingMutation<void>({
    endpoint: replacePlaceholderWithId(endpoints.notifications.delete, notification.id),
    queryKey: [getRequestsOptions.GetAllNotifications.queryKey],
    onSuccess: () =>
      invalidate([getRequestsOptions.GetUnreadNotificationsCount.queryKey]),
  });

  return deleteMutation;
};
