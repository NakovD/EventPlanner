import axios, { AxiosRequestConfig } from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY as string;

export const post = async <TRequestData, TResponseData = void>(
  endpoint: string,
  data: TRequestData,
  config?: AxiosRequestConfig,
) => {
  const finalURL = `${API_KEY}${endpoint}`;
  const response = await axios.post<TResponseData>(finalURL, data, config);
  return await response.data;
};
