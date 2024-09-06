import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

interface IUseAdministrationEventDeleteMutationOptions {
  eventId: number;
}

export const useAdministrationEventDeleteMutation = ({
  eventId,
}: IUseAdministrationEventDeleteMutationOptions) =>
  useSnackbarBlockingMutation<void>({
    endpoint: replacePlaceholderWithId(endpoints.events.delete, eventId),
    queryKey: [getRequestsOptions.GetAllEventsForAdmins.queryKey],
  });
