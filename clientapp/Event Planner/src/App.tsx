import { useAppContext } from 'AppContext';
import { Blocker } from 'features/common/blocker/Blocker';
import { SnackBar } from 'features/common/snackbar/Snackbar';
import { ICategory } from 'features/events/form/models/category';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { router } from 'infrastructure/routing/router';
import { RouterProvider } from 'react-router-dom';

export const App = () => {
  const {
    blocker: { isBlocking },
    snackBar: { snackBarProps },
    isAuthenticated,
  } = useAppContext();

  useReadQuery<ICategory[]>({
    endpoint: getRequestsOptions.GetAllCategories.endpoint,
    queryKey: [getRequestsOptions.GetAllCategories.queryKey],
    cacheTime: 18_00_000,
    staleTime: 18_000_000,
    enabled: isAuthenticated,
  });

  return (
    <>
      <RouterProvider router={router} />
      {isBlocking && <Blocker />}
      <SnackBar {...snackBarProps} />
    </>
  );
};
