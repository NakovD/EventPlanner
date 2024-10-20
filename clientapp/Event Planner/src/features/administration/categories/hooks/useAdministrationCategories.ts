import { useAdministrationCategoriesQuery } from 'features/administration/categories/hooks/useAdministrationCategoriesQuery';
import { useState } from 'react';

export const useAdministrationCategories = () => {
  const { data, isLoading } = useAdministrationCategoriesQuery();

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
