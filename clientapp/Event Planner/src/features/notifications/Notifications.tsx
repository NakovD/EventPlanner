import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Notification } from 'features/notifications/components/Notification';
import { INotification } from 'features/notifications/models/notification';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';

export const Notifications = () => {
  const { data, isLoading } = useReadQuery<INotification[]>({
    endpoint: getRequestsOptions.GetAllNotifications.endpoint,
    queryKey: [getRequestsOptions.GetAllNotifications.queryKey],
  });

  const hasNotifications = data?.length !== 0;

  return (
    <div>
      <h1 className="text-4xl relative mb-12">
        Notifications
        <NotificationsActiveIcon
          className="ml-3"
          color="info"
          sx={{ width: '20px', height: '20px' }}
        />
        <div className="absolute w-20 h-1 left-0 -bottom-2 bg-accent-light"></div>
      </h1>
      {!hasNotifications && !isLoading && <p>You have no notifications.</p>}
      <div className="my-4 flex flex-col gap-16">
        {data?.map((n) => (
          <Notification key={n.id} notification={n} />
        ))}
      </div>
    </div>
  );
};
