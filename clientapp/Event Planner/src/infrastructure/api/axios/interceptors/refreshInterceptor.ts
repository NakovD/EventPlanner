import { AxiosError, AxiosInstance } from 'axios';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';

let retry = false;

export const refreshInterceptor = (instance: AxiosInstance) =>
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status !== 401 || !error.config) return Promise.reject(error);

      const initialRequest = error.config;

      if (retry) return Promise.reject(error);

      retry = true;

      try {
        await instance.get(endpoints.identity.refresh);

        retry = false;
        return instance(initialRequest);
      } catch (refreshError) {
        console.log('Refreh token failed!');
        retry = false;
        return Promise.reject(refreshError);
      }
    },
  );
