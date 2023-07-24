import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAdministrationCategoryForm } from 'features/administration/categories/hooks/useAdministrationCategoryForm';
import { ICategoryForm } from 'features/administration/categories/models/categoryForm';
import { TextField } from 'features/common/form/TextField';
import { ICategory } from 'features/events/form/models/category';
import { propertyOf } from 'infrastructure/utilities/propertyOf';

interface IAdministrationCategoryFormProps {
  category?: ICategory;
  onSubmitCallback: VoidFunction;
}

export const AdministrationCategoryForm = ({
  category,
  onSubmitCallback,
}: IAdministrationCategoryFormProps) => {
  const { control, onSubmit } = useAdministrationCategoryForm({
    category,
    onSubmitCallback,
  });
  return (
    <form className="w-full flex justify-between gap-3" onSubmit={onSubmit}>
      <TextField
        label="New Category Name"
        control={control}
        name={propertyOf<ICategoryForm>('categoryName')}
      />
      <button type="submit">
        <CheckCircleIcon />
      </button>
    </form>
  );
};
