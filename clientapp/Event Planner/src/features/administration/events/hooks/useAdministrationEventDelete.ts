import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useBlockingMutation } from 'infrastructure/api/hooks/useBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

interface IUseAdministrationEventDeleteOptions {
  eventId: number;
}

export const useAdministrationEventDelete = ({
  eventId,
}: IUseAdministrationEventDeleteOptions) => {
  const { mutate } = useBlockingMutation({
    endpoint: replacePlaceholderWithId(endpoints.events.delete, eventId),
    queryKey: [getRequestsOptions.GetAllEventsForAdmins.queryKey],
  });

  return {
    deleteEvent: () => mutate({}),
  };
};
