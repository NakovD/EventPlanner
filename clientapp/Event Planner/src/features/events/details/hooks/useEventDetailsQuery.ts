import { IAllEventsEntity } from "features/events/models/allEventsEntity";
import { getRequestsOptions } from "infrastructure/api/endpoints/getRequestsOptions";
import { useReadQuery } from "infrastructure/api/hooks/useReadQuery";
import { replacePlaceholderWithId } from "infrastructure/utilities/replacePlaceholderWithId";

export const useEventDetailsQuery = (eventId: string) => useReadQuery<IAllEventsEntity>({
    endpoint: replacePlaceholderWithId(getRequestsOptions.GetSingleEvent.endpoint, eventId),
    queryKey: [getRequestsOptions.GetSingleEvent.queryKey],
});