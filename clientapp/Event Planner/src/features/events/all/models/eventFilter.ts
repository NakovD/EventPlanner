import { EventTitleSortType } from 'features/events/all/enums/eventTitleSortType';

export type EventFilter = {
  searchString?: string;
  categoryId?: number;
  sortDirection: EventTitleSortType;
};
