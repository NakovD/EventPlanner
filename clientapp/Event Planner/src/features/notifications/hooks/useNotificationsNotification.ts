import { useNotificationsDeleteNotification } from 'features/notifications/hooks/useNotificationsDeleteNotification';
import { INotification } from 'features/notifications/models/notification';
import { routePaths } from 'infrastructure/routing/routePaths';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useNotificationsMarkNotificationAsReaded } from 'useNotificationsMarkNotificationAsReaded';

interface IUseNotificationsNotificationOptions {
  notification: INotification;
}

export const useNotificationsNotification = ({
  notification,
}: IUseNotificationsNotificationOptions) => {
  const markAsReadMutation = useNotificationsMarkNotificationAsReaded({ notification });

  const deleteMutation = useNotificationsDeleteNotification({ notification });

  const eventLink = replacePlaceholderWithId(
    routePaths.eventDetails.path,
    notification.eventId,
  );

  return {
    eventLink,
    handleMarkAsRead: markAsReadMutation.mutate,
    handleDelete: deleteMutation.mutate,
  };
};
