import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';

import { IAdministrationEvent } from '../models/administratinoEvent';

export const useAdministrationEventsQuery = () =>
  useReadQuery<IAdministrationEvent[]>({
    endpoint: getRequestsOptions.GetAllEventsForAdmins.endpoint,
    queryKey: [getRequestsOptions.GetAllEventsForAdmins.queryKey],
  });
