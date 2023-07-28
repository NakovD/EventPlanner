import { EventForm } from 'features/events/form/EventForm';
import { ICategory } from 'features/events/form/models/category';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';

export const EventCreate = () => {
  useReadQuery<ICategory[]>({
    endpoint: getRequestsOptions.GetAllCategories.endpoint,
    queryKey: [getRequestsOptions.GetAllCategories.queryKey],
  });
  return (
    <div className="my-10">
      <EventForm title="Create your dream Event" />;
    </div>
  );
};
