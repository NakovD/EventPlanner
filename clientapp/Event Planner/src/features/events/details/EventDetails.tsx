import { EventProfile } from 'features/events/common/EventProfile';

import { useEventDetails } from './hooks/useEventDetails';

export const EventDetails = () => {
  const { canEdit, query } = useEventDetails();

  const { isLoading, isError, data: event } = query;

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error occured!</p>;

  return (
    <EventProfile>
      <EventProfile.Image imageUrl={event.image} />
      <EventProfile.Wrapper>
        <EventProfile.Details event={event} />
        {canEdit && <EventProfile.Edit eventId={event.id} />}
        <EventProfile.Description description={event.description} />
        <EventProfile.Attendees canEdit={canEdit} eventId={event.id} />
        <EventProfile.Comments eventId={event.id} />
      </EventProfile.Wrapper>
    </EventProfile>
  );
};
