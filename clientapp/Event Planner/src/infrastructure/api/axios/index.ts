import axios from 'axios';
import { refreshInterceptor } from 'infrastructure/api/axios/interceptors/refreshInterceptor';

const API_KEY = import.meta.env.VITE_API_KEY;

export const eventPlannerInstance = axios.create({
  baseURL: API_KEY,
  withCredentials: true,
});

refreshInterceptor(eventPlannerInstance);
