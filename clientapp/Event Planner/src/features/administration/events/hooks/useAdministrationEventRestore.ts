import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useBlockingMutation } from 'infrastructure/api/hooks/useBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

interface IUseAdministrationEventRestoreOptions {
  eventId: number;
}

export const useAdministrationEventRestore = ({
  eventId,
}: IUseAdministrationEventRestoreOptions) => {
  const { mutate } = useBlockingMutation({
    endpoint: replacePlaceholderWithId(endpoints.events.restore, eventId),
    queryKey: [getRequestsOptions.GetAllEventsForAdmins.queryKey],
  });

  return {
    restoreEvent: () => mutate({}),
  };
};
