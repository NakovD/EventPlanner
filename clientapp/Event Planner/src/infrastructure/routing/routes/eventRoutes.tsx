import { AllEvents } from 'features/events/all/AllEvents';
import { EventCreate } from 'features/events/create/EventCreate';
import { EventDetails } from 'features/events/details/EventDetails';
import { EventEdit } from 'features/events/edit/EventEdit';
import { UserEvents } from 'features/events/user/UserEvents';
import { routePaths } from 'infrastructure/routing/routePaths';

export const eventRoutes = [
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
];
