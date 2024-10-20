import { EventCard } from 'features/events/common/EventCard';
import { routePaths } from 'infrastructure/routing/routePaths';
import { Link } from 'react-router-dom';

import { useUserEventsQuery } from './hooks/useUserEventQuery';

export const UserEvents = () => {
  const { isSuccess, data, isLoading } = useUserEventsQuery();

  const shouldShowEmpty = isLoading ? false : isSuccess ? data.length === 0 : false;

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
