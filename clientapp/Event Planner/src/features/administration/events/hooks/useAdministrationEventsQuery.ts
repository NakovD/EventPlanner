import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';

import { IAdminEvent } from '../models/IAdminEvent';

export const useAdministrationEventsQuery = () =>
  useReadQuery<IAdminEvent[]>({
    endpoint: getRequestsOptions.GetAllEventsForAdmins.endpoint,
    queryKey: [getRequestsOptions.GetAllEventsForAdmins.queryKey],
  });
