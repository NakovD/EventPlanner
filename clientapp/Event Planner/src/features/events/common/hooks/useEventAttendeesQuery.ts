import { IAttendee } from 'features/attendees/models/attendee';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

export const useEventAttendeesQuery = (eventId: number) =>
  useReadQuery<IAttendee[]>({
    endpoint: replacePlaceholderWithId(
      getRequestsOptions.GetAllEventAttendees.endpoint,
      eventId,
    ),
    queryKey: [getRequestsOptions.GetAllEventAttendees.queryKey, eventId],
  });
