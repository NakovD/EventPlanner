import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';

import { IAttendeeUser } from '../models/attendeeUser';

export const useAttendeeInternalUsersQuery = () =>
  useReadQuery<IAttendeeUser[]>({
    endpoint: getRequestsOptions.GetAllAttendeeUsers.endpoint,
    queryKey: [getRequestsOptions.GetAllAttendeeUsers.queryKey],
  });
