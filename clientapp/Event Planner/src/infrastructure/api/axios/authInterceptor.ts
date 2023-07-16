import { AxiosInstance } from 'axios';
import { checkAuthorizationURL } from 'infrastructure/api/utilities/checkAuthorizationURL';
import { parseToken } from 'infrastructure/api/utilities/parseToken';
import { constants } from 'infrastructure/constants';

export const authInterceptor = (axiosInstance: AxiosInstance) =>
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(constants.localStorageTokenKey);

    const url = config.url;

    const doesUrlNeedToken = !checkAuthorizationURL(url as string);

    if (!doesUrlNeedToken) return config;

    if (!token) throw new Error('Token was not found');

    const validToken = parseToken(token);

    config.headers.Authorization = `Bearer ${validToken}`;

    return config;
  });
