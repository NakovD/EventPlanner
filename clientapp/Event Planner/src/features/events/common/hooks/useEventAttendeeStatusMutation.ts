import { IAttendeeStatusRequest } from 'features/attendees/models/attendeeStatusRequest';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

interface IUseEventAttendeeStatusMutationOptions {
  eventId: number;
  attendeeId: number;
}

export const useEventAttendeeStatusMutation = ({
  attendeeId,
  eventId,
}: IUseEventAttendeeStatusMutationOptions) =>
  useSnackbarBlockingMutation<IAttendeeStatusRequest>({
    endpoint: replacePlaceholderWithId(endpoints.attendees.updateStatus, attendeeId),
    queryKey: [getRequestsOptions.GetAllEventAttendees.queryKey, eventId],
  });
