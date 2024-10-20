import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

interface IUseAdministrationDelegateCategoryMutationOptions {
  categoryId: number;
}

export const useAdministrationDelegateCategoryMutation = ({
  categoryId,
}: IUseAdministrationDelegateCategoryMutationOptions) =>
  useSnackbarBlockingMutation<void>({
    endpoint: replacePlaceholderWithId(endpoints.categories.delete, categoryId),
    queryKey: [getRequestsOptions.GetAllCategories.queryKey],
  });
