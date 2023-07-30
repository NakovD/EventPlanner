import SortIcon from '@mui/icons-material/Sort';
import { BaseSelect } from 'features/common/form/base/BaseSelect';
import { BaseTextField } from 'features/common/form/base/BaseTextField';
import { EventTitleSortType } from 'features/events/all/enums/eventTitleSortType';
import { useAllEventsFilter } from 'features/events/all/hooks/useAllEventsFilter';
import { EventFilter } from 'features/events/all/models/eventFilter';

interface IAllEventsFilterProps {
  eventFilter: EventFilter;
  updateEventFilter: (eventFilter: EventFilter) => void;
}

export const AllEventsFilter = ({
  eventFilter,
  updateEventFilter,
}: IAllEventsFilterProps) => {
  const { categories, onSearchChange, onCategoryChange, onSortChange } =
    useAllEventsFilter({
      eventFilter: eventFilter,
      updateEventFilter: updateEventFilter,
    });
  const sortDirectionText =
    eventFilter.sortDirection == EventTitleSortType.Ascending
      ? 'Ascending'
      : 'Descending';

  return (
    <div className="flex gap-10 items-center my-5">
      <BaseTextField
        label="Search for something"
        className="w-1/4"
        onChange={onSearchChange}
      />
      <BaseSelect
        label="Category"
        className="w-3/12"
        options={categories}
        onChange={onCategoryChange}
      />
      <button className="flex gap-2" onClick={onSortChange}>
        <SortIcon />
        Sort by name {sortDirectionText}
      </button>
    </div>
  );
};
