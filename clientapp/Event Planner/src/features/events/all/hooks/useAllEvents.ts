import { EventTitleSortType } from 'features/events/all/enums/eventTitleSortType';
import { EventFilter } from 'features/events/all/models/eventFilter';
import { IAllEventsEntity } from 'features/events/models/allEventsEntity';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { hasValue } from 'infrastructure/utilities/hasValue';
import { useCallback, useState } from 'react';

export const useAllEvents = () => {
  const [eventFilter, setEventFilter] = useState<EventFilter>({
    sortDirection: EventTitleSortType.Ascending,
  });

  const queryParams = mapFilterToQueryParams(eventFilter);

  const { data, isLoading, isFetching } = useReadQuery<IAllEventsEntity[]>({
    endpoint: `${getRequestsOptions.GetAllEvents.endpoint}?${queryParams}`,
    queryKey: [
      getRequestsOptions.GetAllEvents.queryKey,
      eventFilter.categoryId,
      eventFilter.searchString,
      eventFilter.sortDirection,
    ],
    keepPreviousData: true,
  });

  const updateEventFilter = useCallback(
    (eventFilter: EventFilter) => setEventFilter(eventFilter),
    [],
  );

  return {
    isLoading: isLoading || isFetching,
    hasEvents: data?.length !== 0,
    events: data ?? [],
    eventFilter,
    updateEventFilter,
  };
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
