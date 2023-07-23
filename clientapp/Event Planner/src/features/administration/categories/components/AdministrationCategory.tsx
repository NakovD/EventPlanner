import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { AdministrationCategoryForm } from 'features/administration/categories/components/AdministrationCategoryForm';
import { ICategory } from 'features/events/form/models/category';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useAppMutation } from 'infrastructure/api/hooks/useAppMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useState } from 'react';

interface IAdministrationCategoryProps {
  category: ICategory;
}

export const AdministrationCategory = ({ category }: IAdministrationCategoryProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const editModeOff = () => setIsEditMode(false);

  const editModeOn = () => setIsEditMode(true);

  const { mutate: deleteCategory } = useAppMutation({
    endpoint: replacePlaceholderWithId(endpoints.categories.delete, category.id),
    queryKey: [getRequestsOptions.GetAllCategories.queryKey],
  });

  return (
    <div className="p-4 cursor-pointer w-2/4 flex justify-between mb-3 border-4 border-primary-light">
      {isEditMode && (
        <>
          <AdministrationCategoryForm
            category={category}
            onSubmitCallback={editModeOff}
          />
          <button className="ml-6" onClick={editModeOff}>
            <CancelIcon />
          </button>
        </>
      )}

      {!isEditMode && (
        <>
          <span>{category.name}</span>
          <button className="ml-auto mr-4" onClick={editModeOn}>
            <ModeEditIcon />
          </button>
          <button onClick={() => deleteCategory({})}>
            <DeleteIcon />
          </button>
        </>
      )}
    </div>
  );
};
