import { ICategory } from 'features/administration/categories/models/category';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useGetQueryData } from 'infrastructure/api/hooks/useGetQueryData';

export const useEventCategories = () => {
  const getFreshData = useGetQueryData<ICategory[]>([
    getRequestsOptions.GetAllCategories.queryKey,
  ]);

  const categories = getFreshData() ?? [];

  return categories;
};
