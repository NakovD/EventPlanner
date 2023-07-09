import { ICategory } from 'features/events/form/models/category';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';

export const useEventCategories = () => {
  const { data } = useReadQuery<ICategory[]>({
    endpoint: getRequestsOptions.GetAllCategories.endpoint,
    queryKey: [getRequestsOptions.GetAllCategories.queryKey],
  });

  return data ?? [];
};
