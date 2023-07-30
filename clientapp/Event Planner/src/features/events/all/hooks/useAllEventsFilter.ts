import { IOption } from 'features/common/form/models/option';
import { EventTitleSortType } from 'features/events/all/enums/eventTitleSortType';
import { EventFilter } from 'features/events/all/models/eventFilter';
import { useEventCategories } from 'features/events/form/hooks/useEventCategories';
import { hasValue } from 'infrastructure/utilities/hasValue';

interface IUseAlEventsFilterOptions {
  eventFilter: EventFilter;
  updateEventFilter: (eventFilter: EventFilter) => void;
}

export const useAllEventsFilter = ({
  eventFilter,
  updateEventFilter,
}: IUseAlEventsFilterOptions) => {
  const categories: IOption<number>[] = useEventCategories().map((c) => {
    return { label: c.name, value: c.id };
  });

  const onSearchChange = (value: string) =>
    updateEventFilter({
      ...eventFilter,
      searchString: hasValue(value) ? value : undefined,
    });

  const onCategoryChange = (category?: IOption<number>) =>
    updateEventFilter({
      ...eventFilter,
      categoryId: category ? category.value : undefined,
    });

  const onSortChange = () =>
    updateEventFilter({
      ...eventFilter,
      sortDirection: getNewSortDirection(eventFilter.sortDirection),
    });

  return {
    categories,
    onSearchChange,
    onCategoryChange,
    onSortChange,
  };
};

const getNewSortDirection = (oldSortDirection: EventTitleSortType) => {
  if (oldSortDirection === EventTitleSortType.Ascending)
    return EventTitleSortType.Descending;
  return EventTitleSortType.Ascending;
};
