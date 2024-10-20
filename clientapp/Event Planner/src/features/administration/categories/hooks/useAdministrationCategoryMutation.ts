import { ICategoryRequest } from 'features/administration/categories/models/categoryRequest';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

export const useAdministrationCategoryMutation = (categoryId?: number) => {
  const endpoint = categoryId
    ? replacePlaceholderWithId(endpoints.categories.edit, categoryId)
    : endpoints.categories.create;

  return useSnackbarBlockingMutation<ICategoryRequest>({
    endpoint,
    queryKey: [getRequestsOptions.GetAllCategories.queryKey],
  });
};
