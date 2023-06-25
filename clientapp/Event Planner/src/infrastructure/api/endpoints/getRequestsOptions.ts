import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { IGetRequestOptions } from 'infrastructure/api/models/getRequestOptions';

export enum GetRequestType {
  getAllEvents = 'GetAllEvents',
  getSingleEvent = 'GetSingleEvent',
}

export const getRequestsOptions: { [keyof in GetRequestType]: IGetRequestOptions } = {
  [GetRequestType.getAllEvents]: {
    endpoint: endpoints.events.getAll,
    queryKey: 'all-events',
  },
  [GetRequestType.getSingleEvent]: {
    endpoint: endpoints.events.getSingle,
    queryKey: 'event',
  },
};
