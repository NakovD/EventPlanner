import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';

import { IAttendeeUserRequest } from '../models/attendeeUserRequest';

export const useCreateAttendeeMutation = (eventId: number) =>
  useSnackbarBlockingMutation<IAttendeeUserRequest>({
    endpoint: endpoints.attendees.create,
    queryKey: [getRequestsOptions.GetAllEventAttendees.queryKey, eventId],
  });
