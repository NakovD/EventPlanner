import { LogIn } from 'features/authentication/logIn/LogIn';
import { SignUp } from 'features/authentication/signUp/SignUp';
import { Layout } from 'features/common/layout/Layout';
import { AllEvents } from 'features/events/all/AllEvents';
import { EventDetails } from 'features/events/details/EventDetails';
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
        element: <Home />,
      },
      {
        path: routePaths.allEvents.path,
        element: <AllEvents />,
      },
      {
        path: routePaths.eventDetails.path,
        element: <EventDetails />,
      },
    ],
  },
  {
    path: routePaths.login.path,
    element: <LogIn />,
  },
  {
    path: routePaths.signup.path,
    element: <SignUp />,
  },
]);
