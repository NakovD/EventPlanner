import { AxiosRequestConfig } from 'axios';
import { eventPlannerInstance } from 'infrastructure/api/axios';

export const get = async <TData>(
  endpoint: string,
  config?: AxiosRequestConfig,
): Promise<TData> => {
  const { data } = await eventPlannerInstance.get<TData>(endpoint, config);
  return data;
};
