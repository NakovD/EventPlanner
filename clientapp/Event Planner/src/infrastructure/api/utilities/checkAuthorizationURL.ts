import { endpoints } from 'infrastructure/api/endpoints/endpoints';

export const checkAuthorizationURL = (url: string) => {
  const routesWithoutAuth = [
    endpoints.identity.login,
    endpoints.identity.register,
    endpoints.events.attendeeOnly,
    endpoints.attendees.updateExternalStatus,
    endpoints.attendees.status,
    endpoints.attendees.allByEvent,
    endpoints.comments.getAll,
  ];

  const isRouteWithoutAuth = routesWithoutAuth.some((r) => {
    const parsedRoute = r.toLowerCase().replace(':id', '');
    const parsedUrl = url.toLowerCase();

    return parsedUrl.startsWith(parsedRoute);
  });

  return isRouteWithoutAuth;
};
