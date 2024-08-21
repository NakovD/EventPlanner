import { ICategory } from 'features/events/form/models/category';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';

export const useAdministrationCategoriesQuery = () =>
  useReadQuery<ICategory[]>({
    endpoint: getRequestsOptions.GetAllCategories.endpoint,
    queryKey: [getRequestsOptions.GetAllCategories.queryKey],
    staleTime: Infinity,
  });
