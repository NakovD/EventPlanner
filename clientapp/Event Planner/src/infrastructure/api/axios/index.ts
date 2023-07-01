import axios from 'axios';
import { authInterceptor } from 'infrastructure/api/axios/authInterceptor';

const API_KEY = import.meta.env.VITE_API_KEY as string;

export const eventPlannerInstance = axios.create({ baseURL: API_KEY });

export const interceptors = {
  auth: authInterceptor(eventPlannerInstance),
};
