import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useAppMutation } from 'infrastructure/api/hooks/useAppMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

interface IUseAdministrationEventRestoreOptions {
  eventId: number;
}

export const useAdministrationEventRestore = ({
  eventId,
}: IUseAdministrationEventRestoreOptions) => {
  const { mutate } = useAppMutation({
    endpoint: replacePlaceholderWithId(endpoints.events.restore, eventId),
    queryKey: [getRequestsOptions.GetAllEventsForAdmins.queryKey],
  });

  return {
    restoreEvent: () => mutate({}),
  };
};
