import { IExternalAttendeeRequest } from 'features/attendees/form/models/externalAttendeeRequest';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';

interface IUseExternalAttendeeMutationOptions {
  eventId: number;
}

export const useExternalAttendeeMutation = ({
  eventId,
}: IUseExternalAttendeeMutationOptions) =>
  useSnackbarBlockingMutation<IExternalAttendeeRequest>({
    endpoint: endpoints.attendees.createNew,
    queryKey: [getRequestsOptions.GetAllEventAttendees.queryKey, eventId],
  });
