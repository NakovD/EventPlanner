import { AttendeeStatusType } from 'features/attendees/enums/attendeeStatusType';
import { EventProfile } from 'features/events/common/EventProfile';
import { IAllEventsEntity } from 'features/events/models/allEventsEntity';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useParams } from 'react-router-dom';

export const EventDetailsAttendeeOnly = () => {
  const { id: encryptedData } = useParams();
  if (!encryptedData) throw new Error('No id was found!');

  const { data: event } = useReadQuery<IAllEventsEntity>({
    endpoint: replacePlaceholderWithId(
      getRequestsOptions.GetEventForAttendeeOnly.endpoint,
      encryptedData,
    ),
    queryKey: [getRequestsOptions.GetEventForAttendeeOnly.queryKey],
  });

  const { data: attendeeStatus } = useReadQuery<AttendeeStatusType>({
    endpoint: replacePlaceholderWithId(
      getRequestsOptions.GetExternalAttendeeStatus.endpoint,
      encryptedData,
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
