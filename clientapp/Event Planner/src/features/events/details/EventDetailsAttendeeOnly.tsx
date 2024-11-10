import { AttendeeStatusType } from 'features/attendees/enums/attendeeStatusType';
import { EventProfile } from 'features/events/common/EventProfile';
import { IAllEventsEntity } from 'features/events/models/allEventsEntity';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { useValidIdParam } from 'infrastructure/hooks/useValidIdParam';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

//to do: refactor this
export const EventDetailsAttendeeOnly = () => {
  const id = useValidIdParam();

  const { data: event } = useReadQuery<IAllEventsEntity>({
    endpoint: replacePlaceholderWithId(
      getRequestsOptions.GetEventForAttendeeOnly.endpoint,
      id,
    ),
    queryKey: [getRequestsOptions.GetEventForAttendeeOnly.queryKey],
  });

  const { data: attendeeStatus } = useReadQuery<AttendeeStatusType>({
    endpoint: replacePlaceholderWithId(
      getRequestsOptions.GetExternalAttendeeStatus.endpoint,
      id,
    ),
    queryKey: [getRequestsOptions.GetExternalAttendeeStatus.queryKey],
  });

  const shouldShowExternalAttendeeControls =
    attendeeStatus === AttendeeStatusType.NotResponded;

  return (
    event && (
      <EventProfile
        event={event}
        shouldShowExternalAttendeeControls={shouldShowExternalAttendeeControls}
        canEdit={false}
      />
    )
  );
};
