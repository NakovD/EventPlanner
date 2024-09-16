import { IAllEventsEntity } from "features/events/models/allEventsEntity";
import { getRequestsOptions } from "infrastructure/api/endpoints/getRequestsOptions";
import { useReadQuery } from "infrastructure/api/hooks/useReadQuery";

export const useUserEventsQuery = () => useReadQuery<IAllEventsEntity[]>({
    endpoint: getRequestsOptions.GetAllUserEvents.endpoint,
    queryKey: [getRequestsOptions.GetAllUserEvents.queryKey],
});