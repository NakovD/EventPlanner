import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

interface IUseAdministrationEventRestoreMutationOptions {
  eventId: number;
}

export const useAdministrationEventRestoreMutation = ({
  eventId,
}: IUseAdministrationEventRestoreMutationOptions) =>
  useSnackbarBlockingMutation<void>({
    endpoint: replacePlaceholderWithId(endpoints.events.restore, eventId),
    queryKey: [getRequestsOptions.GetAllEventsForAdmins.queryKey],
  });
