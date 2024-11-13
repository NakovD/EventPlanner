import { IAttendeeStatusRequest } from 'features/attendees/models/attendeeStatusRequest';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useInvalidateQueries } from 'infrastructure/api/hooks/useInvalidateQueries';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

export const useEventAttendeeExternalStatusMutation = ({
  linkId,
  eventId,
}: {
  linkId: string;
  eventId: string;
}) => {
  const invalidate = useInvalidateQueries();

  return useSnackbarBlockingMutation<IAttendeeStatusRequest>({
    endpoint: replacePlaceholderWithId(endpoints.attendees.updateExternalStatus, linkId),
    queryKey: [getRequestsOptions.GetAllEventAttendees.queryKey, eventId],
    onSuccess: () => invalidate([getRequestsOptions.GetExternalAttendeeStatus.queryKey]),
  });
};
