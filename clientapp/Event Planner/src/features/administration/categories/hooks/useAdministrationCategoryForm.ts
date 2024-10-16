import { useAdministrationCategoryMutation } from 'features/administration/categories/hooks/useAdministrationCategoryMutation';
import { ICategoryForm } from 'features/administration/categories/models/categoryForm';
import { ICategory } from 'features/administration/categories/models/category';
import { useForm } from 'react-hook-form';

interface IUseAdministrationCategoryFormOptions {
  category?: ICategory;
  onSubmitCallback: VoidFunction;
}

export const useAdministrationCategoryForm = ({
  category,
  onSubmitCallback,
}: IUseAdministrationCategoryFormOptions) => {
  const categoryName = category?.name ?? '';

  const { control, handleSubmit } = useForm<ICategoryForm>({
    defaultValues: { categoryName: categoryName },
  });

  const mutation = useAdministrationCategoryMutation(category?.id);

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({ id: category?.id, name: data.categoryName });
    onSubmitCallback();
  });

  return {
    control,
    onSubmit,
  };
};
