import { IAttendeeStatusRequest } from 'features/attendees/models/attendeeStatusRequest';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

export const useEventAttendeeExternalStatusMutation = ({
  linkId,
  eventId,
}: {
  linkId: string;
  eventId: string;
}) =>
  useSnackbarBlockingMutation<IAttendeeStatusRequest>({
    endpoint: replacePlaceholderWithId(endpoints.attendees.updateExternalStatus, linkId),
    queryKey: [getRequestsOptions.GetAllEventAttendees.queryKey, eventId],
  });
