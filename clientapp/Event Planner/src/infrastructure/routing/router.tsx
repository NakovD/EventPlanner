import { LogIn } from 'features/authentication/logIn/LogIn';
import { Layout } from 'features/common/layout/Layout';
import { AllEvents } from 'features/events/all/AllEvents';
import { Home } from 'features/home/Home';
import { routePaths } from 'infrastructure/routing/routePaths';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: routePaths.index,
    element: <Layout />,
    children: [
      {
        index: true,
        path: routePaths.home,
        element: <Home />,
      },
      {
        path: routePaths.allEvents,
        element: <AllEvents />,
      },
    ],
  },
  {
    path: routePaths.login,
    element: <LogIn />,
  },
  {
    path: routePaths.singup,
    element: <LogIn />,
  },
]);
