import { ICategoryForm } from 'features/administration/categories/models/categoryForm';
import { ICategoryRequest } from 'features/administration/categories/models/categoryRequest';
import { ICategory } from 'features/events/form/models/category';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
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

  const endpoint = category
    ? replacePlaceholderWithId(endpoints.categories.edit, category?.id)
    : endpoints.categories.create;

  const { mutate } = useSnackbarBlockingMutation<ICategoryRequest>({
    endpoint,
    queryKey: [getRequestsOptions.GetAllCategories.queryKey],
  });

  const onSubmit = handleSubmit((data) => {
    mutate({ id: category?.id, name: data.categoryName });
    onSubmitCallback();
  });

  return {
    control,
    onSubmit,
  };
};
