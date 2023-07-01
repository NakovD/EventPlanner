import { endpoints } from 'infrastructure/api/endpoints/endpoints';

export const checkAuthorizationURL = (url: string) => {
  const routesWithoutAuth = [
    endpoints.user.login.toLowerCase(),
    endpoints.user.register.toLowerCase(),
  ];

  return !routesWithoutAuth.includes(url.toLowerCase());
};
