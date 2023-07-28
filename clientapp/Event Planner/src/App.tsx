import { useAppContext } from 'AppContext';
import { Blocker } from 'features/common/blocker/Blocker';
import { SnackBar } from 'features/common/snackbar/Snackbar';
import { router } from 'infrastructure/routing/router';
import { RouterProvider } from 'react-router-dom';

export const App = () => {
  const {
    blocker: { isBlocking },
    snackBar: { snackBarProps },
  } = useAppContext();

  return (
    <>
      <RouterProvider router={router} />
      {isBlocking && <Blocker />}
      <SnackBar {...snackBarProps} />
    </>
  );
};
