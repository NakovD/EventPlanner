import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY as string;

export const get = async <TData>(endpoint: string): Promise<TData> => {
  const finalURL = `${API_KEY}${endpoint}`;
  const { data } = await axios.get<TData>(finalURL);
  return data;
};
