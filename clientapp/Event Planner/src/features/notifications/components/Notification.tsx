import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Button } from 'features/common/button/Button';
import { notificationTypeTextMapper } from 'features/notifications/data/notificationTypeTextMapper';
import { INotification } from 'features/notifications/models/notification';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useInvalidateQueries } from 'infrastructure/api/hooks/useInvalidateQueries';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { routePaths } from 'infrastructure/routing/routePaths';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { Link } from 'react-router-dom';

interface INotificationProps {
  notification: INotification;
}

export const Notification = ({ notification }: INotificationProps) => {
  const invalidate = useInvalidateQueries();

  const { mutate: markSingleAsReaded } = useSnackbarBlockingMutation({
    endpoint: replacePlaceholderWithId(
      endpoints.notifications.markSingleAsReaded,
      notification.id,
    ),
    queryKey: [getRequestsOptions.GetAllNotifications.queryKey],
    onSuccess: () =>
      invalidate([getRequestsOptions.GetUnreadNotificationsCount.queryKey]),
  });

  const { mutate: deleteNotification } = useSnackbarBlockingMutation({
    endpoint: replacePlaceholderWithId(endpoints.notifications.delete, notification.id),
    queryKey: [getRequestsOptions.GetAllNotifications.queryKey],
    onSuccess: () =>
      invalidate([getRequestsOptions.GetUnreadNotificationsCount.queryKey]),
  });

  const eventLink = replacePlaceholderWithId(
    routePaths.eventDetails.path,
    notification.eventId,
  );

  return (
    <div className="flex gap-10 shadow-2xl p-5 relative">
      {!notification.isReaded && (
        <div className="absolute w-1 bg-primary-light left-0 top-0 h-full"></div>
      )}
      <NotificationsActiveIcon
        className="ml-3 place-self-center"
        color="success"
        sx={{ width: '60px', height: '60px' }}
      />
      <div className="grid w-full">
        <p className="mb-6">{notificationTypeTextMapper[notification.type]}</p>
        <p>{notification.description}</p>

        <p className="text-end text-sm">
          Notification created at: {notification.createdAt}
        </p>
        {!notification.isReaded && (
          <Button
            className="max-w-xs"
            label="Mark as readed"
            onClick={() => markSingleAsReaded({})}
          />
        )}
        <Button
          className="max-w-xs mt-2"
          label="Delete"
          onClick={() => deleteNotification({})}
        />
        <Link className="text-right font-medium text-primary-light" to={eventLink}>
          Go to the event
        </Link>
      </div>
    </div>
  );
};
