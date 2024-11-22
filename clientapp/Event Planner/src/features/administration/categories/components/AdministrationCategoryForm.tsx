import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAdministrationCategoryForm } from 'features/administration/categories/hooks/useAdministrationCategoryForm';
import { ICategory } from 'features/administration/categories/models/category';
import { Textfield } from 'features/common/form/Textfield';

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
      <Textfield label="New Category Name" control={control} name="categoryName" />
      <button type="submit">
        <CheckCircleIcon />
      </button>
    </form>
  );
};
