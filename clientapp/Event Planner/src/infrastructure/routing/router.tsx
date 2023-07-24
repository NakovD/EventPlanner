import { Administration } from 'features/administration/Administration';
import { AdministrationCategories } from 'features/administration/categories/AdministrationCategories';
import { AdministrationEvents } from 'features/administration/events/AdministrationEvents';
import { ManageAttendees } from 'features/attendees/manage/ManageAttendees';
import { LogIn } from 'features/authentication/logIn/LogIn';
import { SignUp } from 'features/authentication/signUp/SignUp';
import { AuthorizeOutlet } from 'features/authorization/AuthorizeOutlet';
import { Layout } from 'features/common/layout/Layout';
import { AllEvents } from 'features/events/all/AllEvents';
import { EventCreate } from 'features/events/create/EventCreate';
import { EventDetails } from 'features/events/details/EventDetails';
import { EventDetailsAttendeeOnly } from 'features/events/details/EventDetailsAttendeeOnly';
import { EventEdit } from 'features/events/edit/EventEdit';
import { UserEvents } from 'features/events/user/UserEvents';
import { Home } from 'features/home/Home';
import { Notifications } from 'features/notifications/Notifications';
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
        path: routePaths.userEvents.path,
        element: <UserEvents />,
      },
      {
        path: routePaths.eventEdit.path,
        element: <EventEdit />,
      },
      {
        path: routePaths.eventDetails.path,
        element: <EventDetails />,
      },
      {
        path: routePaths.eventCreate.path,
        element: <EventCreate />,
      },
      { path: routePaths.manageAttendees.path, element: <ManageAttendees /> },
      {
        path: routePaths.notifications.path,
        element: <Notifications />,
      },
      {
        path: routePaths.administration.path,
        element: (
          <AuthorizeOutlet>
            <Administration />
          </AuthorizeOutlet>
        ),
      },
      {
        path: routePaths.administrationCategories.path,
        element: (
          <AuthorizeOutlet>
            <AdministrationCategories />
          </AuthorizeOutlet>
        ),
      },
      {
        path: routePaths.administrationEvents.path,
        element: (
          <AuthorizeOutlet>
            <AdministrationEvents />
          </AuthorizeOutlet>
        ),
      },
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
    element: <SignUp />,
  },
]);
