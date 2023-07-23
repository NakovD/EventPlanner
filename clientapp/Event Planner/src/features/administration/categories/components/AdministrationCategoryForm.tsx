import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ICategoryForm } from 'features/administration/categories/models/categoryForm';
import { ICategoryRequest } from 'features/administration/categories/models/categoryRequest';
import { TextField } from 'features/common/form/TextField';
import { ICategory } from 'features/events/form/models/category';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useAppMutation } from 'infrastructure/api/hooks/useAppMutation';
import { propertyOf } from 'infrastructure/utilities/propertyOf';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useForm } from 'react-hook-form';

interface IAdministrationCategoryFormProps {
  category?: ICategory;
  onSubmitCallback: VoidFunction;
}

export const AdministrationCategoryForm = ({
  category,
  onSubmitCallback,
}: IAdministrationCategoryFormProps) => {
  const categoryName = category?.name ?? '';
  const { control, handleSubmit } = useForm<ICategoryForm>({
    defaultValues: { categoryName: categoryName },
  });

  const endpoint = category
    ? replacePlaceholderWithId(endpoints.categories.update, category?.id)
    : endpoints.categories.add;

  const { mutate } = useAppMutation<ICategoryRequest>({
    endpoint,
    queryKey: [getRequestsOptions.GetAllCategories.queryKey],
  });

  const onSubmit = handleSubmit((data) => {
    mutate({ id: category?.id, name: data.categoryName });
    onSubmitCallback();
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
