import { AttendeeStatusType } from 'features/attendees/enums/attendeeStatusType';
import { IAllEventsEntity } from 'features/events/models/allEventsEntity';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { useValidIdParam } from 'infrastructure/hooks/useValidIdParam';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

export const useEventDetailsAttendeeOnly = () => {
  const id = useValidIdParam();

  const eventQuery = useReadQuery<IAllEventsEntity>({
    endpoint: replacePlaceholderWithId(
      getRequestsOptions.GetEventForAttendeeOnly.endpoint,
      id,
    ),
    queryKey: [getRequestsOptions.GetEventForAttendeeOnly.queryKey],
  });

  const attendeeStatusQuery = useReadQuery<AttendeeStatusType>({
    endpoint: replacePlaceholderWithId(
      getRequestsOptions.GetExternalAttendeeStatus.endpoint,
      id,
    ),
    enabled: eventQuery.isSuccess,
    queryKey: [getRequestsOptions.GetExternalAttendeeStatus.queryKey],
  });

  return {
    eventQuery,
    attendeeStatusQuery,
  };
};
