import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';

import { IAdministratinoEvent } from '../models/administratinoEvent';

export const useAdministrationEventsQuery = () =>
  useReadQuery<IAdministratinoEvent[]>({
    endpoint: getRequestsOptions.GetAllEventsForAdmins.endpoint,
    queryKey: [getRequestsOptions.GetAllEventsForAdmins.queryKey],
  });
