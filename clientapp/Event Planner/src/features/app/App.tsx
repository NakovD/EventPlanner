import 'react-toastify/dist/ReactToastify.css';

import { Blocker } from 'features/common/blocker/Blocker';
import { router } from 'infrastructure/routing/router';
import { RouterProvider } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';

import { useApp } from './hooks/useApp';

export const App = () => {
  const { isBlocking } = useApp();

  return (
    <>
      <RouterProvider router={router} />
      {isBlocking && <Blocker />}
      <ToastContainer
        hideProgressBar={true}
        position="bottom-left"
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable={false}
        transition={Flip}
      />
    </>
  );
};
