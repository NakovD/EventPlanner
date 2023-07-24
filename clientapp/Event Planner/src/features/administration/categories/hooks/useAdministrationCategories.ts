import { ICategory } from 'features/events/form/models/category';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { useState } from 'react';

export const useAdministrationCategories = () => {
  const { data, isLoading } = useReadQuery<ICategory[]>({
    endpoint: getRequestsOptions.GetAllCategories.endpoint,
    queryKey: [getRequestsOptions.GetAllCategories.queryKey],
  });

  const hasCategories = data?.length !== 0;

  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  const hideAddForm = () => setIsAddFormVisible(false);

  const toggleAddForm = () => setIsAddFormVisible(true);

  return {
    isLoading,
    hasCategories,
    categories: data,
    isAddFormVisible,
    hideAddForm,
    toggleAddForm,
  };
};
