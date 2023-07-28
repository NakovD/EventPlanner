import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

interface IUseAdministrationEventDeleteOptions {
  eventId: number;
}

export const useAdministrationEventDelete = ({
  eventId,
}: IUseAdministrationEventDeleteOptions) => {
  const { mutate } = useSnackbarBlockingMutation({
    endpoint: replacePlaceholderWithId(endpoints.events.delete, eventId),
    queryKey: [getRequestsOptions.GetAllEventsForAdmins.queryKey],
  });

  return {
    deleteEvent: () => mutate({}),
  };
};
