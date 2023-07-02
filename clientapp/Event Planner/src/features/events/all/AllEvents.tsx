import { Button } from 'features/common/button/Button';
import { EventCard } from 'features/events/common/EventCard';
import { IAllEventsEntity } from 'features/events/models/allEventsEntity';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { routePaths } from 'infrastructure/routing/routePaths';

export const AllEvents = () => {
  const { data } = useReadQuery<IAllEventsEntity[]>({
    endpoint: getRequestsOptions.GetAllEvents.endpoint,
    queryKey: [getRequestsOptions.GetAllEvents.queryKey],
  });

  return (
    <>
      <Button className="w-max" to={routePaths.eventCreate.path} label="Create event" />
      <div className="my-5 flex flex-wrap gap-7 justify-center text-secondary-light ">
        {data?.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </>
  );
};
