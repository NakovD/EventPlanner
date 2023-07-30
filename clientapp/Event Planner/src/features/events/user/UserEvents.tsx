import { EventCard } from 'features/events/common/EventCard';
import { IAllEventsEntity } from 'features/events/models/allEventsEntity';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { routePaths } from 'infrastructure/routing/routePaths';
import { Link } from 'react-router-dom';

export const UserEvents = () => {
  const { data, isLoading } = useReadQuery<IAllEventsEntity[]>({
    endpoint: getRequestsOptions.GetAllUserEvents.endpoint,
    queryKey: [getRequestsOptions.GetAllUserEvents.queryKey],
  });

  const shouldShowEmpty = data?.length === 0;

  return (
    <>
      <div className="my-10 flex flex-wrap gap-7 justify-center text-secondary-light ">
        {data?.map((e) => (
          <EventCard isLoading={isLoading} key={e.id} event={e} />
        ))}
        {shouldShowEmpty && (
          <p className="text-text-light">
            You still havent created any events. Create one{' '}
            <Link
              className="text-accent-light font-bold"
              to={routePaths.eventCreate.path}
            >
              now
            </Link>
            !
          </p>
        )}
      </div>
    </>
  );
};
