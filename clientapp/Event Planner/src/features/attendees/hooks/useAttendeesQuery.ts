import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

import { IAttendee } from '../models/attendee';

export const useAttendeesQuery = (eventId: string) =>
  useReadQuery<IAttendee[]>({
    endpoint: replacePlaceholderWithId(
      getRequestsOptions.GetAllEventAttendees.endpoint,
      eventId,
    ),
    queryKey: [getRequestsOptions.GetAllEventAttendees.queryKey, +eventId],
  });
