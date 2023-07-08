import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { IGetRequestOptions } from 'infrastructure/api/models/getRequestOptions';

export enum GetRequestType {
  getAllEvents = 'GetAllEvents',
  getSingleEvent = 'GetSingleEvent',
  getAllUserEvents = 'GetAllUserEvents',
  getAllEventAttendees = 'GetAllEventAttendees',
  getAllUsers = 'GetAllUsers',
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
  [GetRequestType.getAllUserEvents]: {
    endpoint: endpoints.events.getAllUserEvents,
    queryKey: 'all-user-events',
  },
  [GetRequestType.getAllEventAttendees]: {
    endpoint: endpoints.attendees.allByEvent,
    queryKey: 'attendees',
  },
  [GetRequestType.getAllUsers]: {
    endpoint: endpoints.user.getAll,
    queryKey: 'all-users',
  },
};
