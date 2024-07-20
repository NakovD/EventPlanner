import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Button } from 'features/common/button/Button';
import { notificationTypeTextMapper } from 'features/notifications/data/notificationTypeTextMapper';
import { useNotificationsNotification } from 'features/notifications/hooks/useNotificationsNotification';
import { INotification } from 'features/notifications/models/notification';
import { Link } from 'react-router-dom';

interface INotificationProps {
  notification: INotification;
}

export const Notification = ({ notification }: INotificationProps) => {
  const { eventLink, handleDelete, handleMarkAsRead } = useNotificationsNotification({
    notification,
  });

  return (
    <div className="flex gap-10 shadow-2xl p-5 relative">
      {!notification.isReaded && (
        <div className="absolute w-1 bg-primary-light left-0 top-0 h-full"></div>
      )}
      <NotificationsActiveIcon
        className="ml-3 place-self-center"
        color="success"
        sx={{
          width: '60px',
          height: '60px',
        }}
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
            onClick={() => handleMarkAsRead()}
          />
        )}
        <Button className="max-w-xs mt-2" label="Delete" onClick={() => handleDelete} />
        <Link className="text-right font-medium text-primary-light" to={eventLink}>
          Go to the event
        </Link>
      </div>
    </div>
  );
};
