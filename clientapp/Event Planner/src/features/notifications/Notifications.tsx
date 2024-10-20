import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { ServerErrorMessage } from 'features/common/message/errorMessage/ServerErrorMessage';
import { AppSkeleton } from 'features/common/skeleton/AppSkeleton';
import { Notification } from 'features/notifications/components/Notification';
import { useNotificationsQuery } from 'features/notifications/hooks/useNotificationsQuery';

export const Notifications = () => {
  const { isSuccess, isError, data, isLoading } = useNotificationsQuery();

  const shouldShowEmptyNotifications = isSuccess ? data.length === 0 : false;

  return (
    <div>
      <h1 className="text-4xl relative mb-12">
        Notifications
        <NotificationsActiveIcon
          className="ml-3"
          color="info"
          sx={{
            width: '20px',
            height: '20px',
          }}
        />
        <div className="absolute w-20 h-1 left-0 -bottom-2 bg-accent-light"></div>
      </h1>
      {shouldShowEmptyNotifications && <p>You have no notifications.</p>}
      {isError && <ServerErrorMessage />}
      {isLoading && <AppSkeleton width="full-width" height={244} />}
      {isSuccess && (
        <div className="my-4 flex flex-col gap-16">
          {data.map((n) => (
            <Notification key={n.id} notification={n} />
          ))}
        </div>
      )}
    </div>
  );
};
