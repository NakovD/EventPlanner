import { ManageAttendees } from 'features/attendees/ManageAttendees';
import { LogIn } from 'features/authentication/logIn/LogIn';
import { Register } from 'features/authentication/register/Register';
import { Layout } from 'features/common/layout/Layout';
import { EventDetailsAttendeeOnly } from 'features/events/details/EventDetailsAttendeeOnly';
import { Home } from 'features/home/Home';
import { Notifications } from 'features/notifications/Notifications';
import { routePaths } from 'infrastructure/routing/routePaths';
import { administrationRoutes } from 'infrastructure/routing/routes/administrationRoutes';
import { eventRoutes } from 'infrastructure/routing/routes/eventRoutes';
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
      ...eventRoutes,
      { path: routePaths.manageAttendees.path, element: <ManageAttendees /> },
      {
        path: routePaths.notifications.path,
        element: <Notifications />,
      },
      ...administrationRoutes,
    ],
  },
  {
    path: routePaths.login.path,
    element: <LogIn />,
  },
  {
    path: routePaths.eventDetailsInvitedAttendee.path,
    element: <EventDetailsAttendeeOnly />,
  },
  {
    path: routePaths.signup.path,
    element: <Register />,
  },
]);
