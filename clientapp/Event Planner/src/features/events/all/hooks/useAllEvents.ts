import { EventTitleSortType } from 'features/events/all/enums/eventTitleSortType';
import { EventFilter } from 'features/events/all/models/eventFilter';
import { useCallback, useState } from 'react';

import { useAllEventsQuery } from './useAllEventsQuery';

export const useAllEvents = () => {
  const [eventFilter, setEventFilter] = useState<EventFilter>({
    sortDirection: EventTitleSortType.Ascending,
  });

  const { data, isLoading, isFetching } = useAllEventsQuery({ eventFilter });

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
