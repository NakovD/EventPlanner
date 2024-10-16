import { useAdministrationDelegateCategoryMutation } from 'features/administration/categories/hooks/useAdministrationDeleteCategoryMutation';
import { ICategory } from 'features/administration/categories/models/category';
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

  const { mutate: deleteCategory } = useAdministrationDelegateCategoryMutation({
    categoryId: category.id,
  });

  return {
    isEditMode,
    editModeOff,
    editModeOn,
    deleteCategory: () => deleteCategory(),
  };
};
