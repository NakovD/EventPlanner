import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useInvalidateQueries } from 'infrastructure/api/hooks/useInvalidateQueries';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

interface IUseDeleteAttendeeOptions {
  id: number;
  eventId: number;
}

export const useDeleteAttendee = ({ id, eventId }: IUseDeleteAttendeeOptions) => {
  const invalidate = useInvalidateQueries();

  const endpoint = replacePlaceholderWithId(endpoints.attendees.delete, id);

  const { mutate } = useSnackbarBlockingMutation({
    endpoint: endpoint,
    queryKey: [getRequestsOptions.GetAllEventAttendees.queryKey, eventId],
    onSuccess: () => invalidate([getRequestsOptions.GetAllAttendeeUsers.queryKey]),
  });

  const deleteAttendee = () => mutate({});

  return {
    deleteAttendee,
  };
};
