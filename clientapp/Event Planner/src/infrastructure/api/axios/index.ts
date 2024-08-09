import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY as string;

export const eventPlannerInstance = axios.create({
  baseURL: API_KEY,
  withCredentials: true,
});
