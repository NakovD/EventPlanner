import { AxiosRequestConfig } from 'axios';
import { eventPlannerInstance } from 'infrastructure/api/axios';

export const post = async <TRequestData, TResponseData = void>(
  endpoint: string,
  data: TRequestData,
  config?: AxiosRequestConfig,
) => {
  const response = await eventPlannerInstance.post<TResponseData>(endpoint, data, config);
  return await response.data;
};
