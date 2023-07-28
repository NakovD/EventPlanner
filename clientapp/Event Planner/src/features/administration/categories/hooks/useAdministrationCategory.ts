import { ICategory } from 'features/events/form/models/category';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useState } from 'react';

interface IUseAdministrationCategoryOptions {
  category: ICategory;
}

export const useAdministrationCategory = ({
  category,
}: IUseAdministrationCategoryOptions) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const editModeOff = () => setIsEditMode(false);

  const editModeOn = () => setIsEditMode(true);

  const { mutate: deleteCategory } = useSnackbarBlockingMutation({
    endpoint: replacePlaceholderWithId(endpoints.categories.delete, category.id),
    queryKey: [getRequestsOptions.GetAllCategories.queryKey],
  });

  return {
    isEditMode,
    editModeOff,
    editModeOn,
    deleteCategory: () => deleteCategory({}),
  };
};
