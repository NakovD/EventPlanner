import { Administration } from 'features/administration/Administration';
import { AdministrationCategories } from 'features/administration/categories/AdministrationCategories';
import { AdministrationEvents } from 'features/administration/events/AdministrationEvents';
import { AdministrationUsers } from 'features/administration/users/AdministrationUsers';
import { AuthorizeOutlet } from 'features/authorization/AuthorizeOutlet';
import { routePaths } from 'infrastructure/routing/routePaths';

export const administrationRoutes = [
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
  {
    path: routePaths.administrationUsers.path,
    element: (
      <AuthorizeOutlet>
        <AdministrationUsers />
      </AuthorizeOutlet>
    ),
  },
];
