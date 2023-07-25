import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { IGetRequestOptions } from 'infrastructure/api/models/getRequestOptions';

export enum GetRequestType {
  getAllEvents = 'GetAllEvents',
  getSingleEvent = 'GetSingleEvent',
  getAllUserEvents = 'GetAllUserEvents',
  getAllEventAttendees = 'GetAllEventAttendees',
  getAllUsers = 'GetAllUsers',
  getAllAttendeeUsers = 'GetAllAttendeeUsers',
  getEventForAttendeeOnly = 'GetEventForAttendeeOnly',
  getAllCategories = 'GetAllCategories',
  getExternalAttendeeStatus = 'GetExternalAttendeeStatus',
  getUnreadNotificationsCount = 'GetUnreadNotificationsCount',
  getAllNotifications = 'GetAllNotifications',
  getAllEventsForAdmins = 'GetAllEventsForAdmins',
  getAllComments = 'GetAllComments',
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
  [GetRequestType.getEventForAttendeeOnly]: {
    endpoint: endpoints.events.attendeeOnly,
    queryKey: 'event-attendee-only',
  },
  [GetRequestType.getAllCategories]: {
    endpoint: endpoints.categories.getAll,
    queryKey: 'all-categories',
  },
  [GetRequestType.getExternalAttendeeStatus]: {
    endpoint: endpoints.attendees.status,
    queryKey: 'external-attendee-status',
  },
  [GetRequestType.getUnreadNotificationsCount]: {
    endpoint: endpoints.notifications.unreadCount,
    queryKey: 'unread-notifications-count',
  },
  [GetRequestType.getAllNotifications]: {
    endpoint: endpoints.notifications.getAll,
    queryKey: 'all-notifications',
  },
  [GetRequestType.getAllEventsForAdmins]: {
    endpoint: endpoints.events.getAllAdmin,
    queryKey: 'all-events-admin',
  },
  [GetRequestType.getAllComments]: {
    endpoint: endpoints.comments.getAll,
    queryKey: 'all-comments',
  },
  [GetRequestType.getAllAttendeeUsers]: {
    endpoint: endpoints.user.getAllAttendee,
    queryKey: 'attendee-users',
  },
};
