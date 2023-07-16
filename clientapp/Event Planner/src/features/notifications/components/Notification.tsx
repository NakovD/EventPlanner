import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Button } from 'features/common/button/Button';
import { notificationTypeTextMapper } from 'features/notifications/data/notificationTypeTextMapper';
import { INotification } from 'features/notifications/models/notification';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useAppMutation } from 'infrastructure/api/hooks/useAppMutation';
import { useInvalidateQueries } from 'infrastructure/api/hooks/useInvalidateQueries';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

interface INotificationProps {
  notification: INotification;
}

export const Notification = ({ notification }: INotificationProps) => {
  const invalidate = useInvalidateQueries();

  const { mutate } = useAppMutation({
    endpoint: replacePlaceholderWithId(
      endpoints.notifications.markSingleAsReaded,
      notification.id,
    ),
    queryKey: [getRequestsOptions.GetAllNotifications.queryKey],
    onSuccess: () =>
      invalidate([getRequestsOptions.GetUnreadNotificationsCount.queryKey]),
  });
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
        <Button className="max-w-xs" label="Mark as readed" onClick={() => mutate({})} />
      </div>
    </div>
  );
};
