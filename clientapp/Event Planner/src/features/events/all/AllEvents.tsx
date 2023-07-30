import { Button } from 'features/common/button/Button';
import { AllEventsFilter } from 'features/events/all/components/AllEventsFilter';
import { useAllEvents } from 'features/events/all/hooks/useAllEvents';
import { EventCard } from 'features/events/common/EventCard';
import { routePaths } from 'infrastructure/routing/routePaths';

export const AllEvents = () => {
  const { isLoading, hasEvents, events, eventFilter, updateEventFilter } = useAllEvents();

  return (
    <>
      <Button className="w-max" to={routePaths.eventCreate.path} label="Create event" />
      <AllEventsFilter eventFilter={eventFilter} updateEventFilter={updateEventFilter} />
      <div className="my-5 flex flex-wrap gap-7 justify-center text-secondary-light ">
        {!hasEvents && <p className="text-text-light">No events found!</p>}
        {events.map((e) => (
          <EventCard isLoading={isLoading} key={e.id} event={e} />
        ))}
      </div>
    </>
  );
};
