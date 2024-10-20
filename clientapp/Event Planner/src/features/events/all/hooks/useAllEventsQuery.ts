import { IAllEventsEntity } from 'features/events/models/allEventsEntity';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { hasValue } from 'infrastructure/utilities/hasValue';

import { EventFilter } from '../models/eventFilter';

interface IUseAllEventsQueryOptions {
  eventFilter: EventFilter;
}

export const useAllEventsQuery = ({ eventFilter }: IUseAllEventsQueryOptions) => {
  const queryParams = mapFilterToQueryParams(eventFilter);

  return useReadQuery<IAllEventsEntity[]>({
    endpoint: `${getRequestsOptions.GetAllEvents.endpoint}?${queryParams}`,
    queryKey: [
      getRequestsOptions.GetAllEvents.queryKey,
      eventFilter.categoryId,
      eventFilter.searchString,
      eventFilter.sortDirection,
    ],
    keepPreviousData: true,
  });
};

const mapFilterToQueryParams = (eventFilter: EventFilter) => {
  const searchString = hasValue(eventFilter.searchString)
    ? `searchString=${eventFilter.searchString}`
    : '';
  const category = hasValue(eventFilter.categoryId)
    ? `categoryId=${eventFilter.categoryId}`
    : '';

  const sortDirection = `sortDirection=${eventFilter.sortDirection}`;

  return `${searchString ? `${searchString}&` : ''}${
    category ? `${category}&` : ''
  }${sortDirection}`;
};
