import { useAppContext } from 'AppContext';
import { Blocker } from 'features/common/blocker/Blocker';
import { router } from 'infrastructure/routing/router';
import { RouterProvider } from 'react-router-dom';

export const App = () => {
  const {
    blocker: { isBlocking },
  } = useAppContext();
  return (
    <>
      <RouterProvider router={router} />
      {isBlocking && <Blocker />}
    </>
  );
};
