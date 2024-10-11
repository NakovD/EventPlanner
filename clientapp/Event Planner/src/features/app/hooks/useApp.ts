import { useAppContext, useBlockerStore } from 'AppContext';
import { ICategory } from 'features/events/form/models/category';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';

export const useApp = () => {
  const { isAuthenticated } = useAppContext();

  const isBlocking = useBlockerStore((s) => s.isBlocking);

  useReadQuery<ICategory[]>({
    endpoint: getRequestsOptions.GetAllCategories.endpoint,
    queryKey: [getRequestsOptions.GetAllCategories.queryKey],
    staleTime: Infinity,
    enabled: isAuthenticated,
  });

  return {
    isBlocking,
  };
};
