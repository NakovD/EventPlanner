import { AttendeeStatusType } from 'features/attendees/enums/attendeeStatusType';
import { AppSkeleton } from 'features/common/skeleton/AppSkeleton';
import { EventProfile } from 'features/events/common/EventProfile';

import { useEventDetailsAttendeeOnly } from './hooks/useEventDetailsAttendeeOnly';

export const EventDetailsAttendeeOnly = () => {
  const { eventQuery, attendeeStatusQuery } = useEventDetailsAttendeeOnly();

  if (eventQuery.isLoading) return <p>Loading...</p>;

  if (eventQuery.isError) return <p>Error occured!</p>;

  const { data: event } = eventQuery;

  return (
    <EventProfile>
      <EventProfile.Image imageUrl={event.image} />
      <EventProfile.Wrapper>
        <EventProfile.Details event={event} />
        {attendeeStatusQuery.isLoading && <AppSkeleton width="full-width" height={40} />}
        {attendeeStatusQuery.isSuccess && (
          <EventProfile.ExternalControlls
            eventId={event.id}
            hasAttendeeUpdatedStatus={
              attendeeStatusQuery.data !== AttendeeStatusType.NotResponded
            }
          />
        )}
        <EventProfile.Description description={event.description} />
        <EventProfile.Attendees canEdit={false} eventId={event.id} />
        <EventProfile.Comments eventId={event.id} />
      </EventProfile.Wrapper>
    </EventProfile>
  );
};
