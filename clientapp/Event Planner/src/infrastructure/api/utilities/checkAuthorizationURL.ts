import { endpoints } from 'infrastructure/api/endpoints/endpoints';

export const checkAuthorizationURL = (url: string) => {
  const routesWithoutAuth = [
    endpoints.user.login.toLowerCase(),
    endpoints.user.register.toLowerCase(),
    endpoints.events.attendeeOnly.toLowerCase(),
  ];

  return !routesWithoutAuth.some((u) => u.toLowerCase().startsWith(url.toLowerCase()));
};
