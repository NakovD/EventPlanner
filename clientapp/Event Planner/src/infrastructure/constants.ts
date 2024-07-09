import { routePaths } from 'infrastructure/routing/routePaths';

export const constants = {
  idPlaceholder: ':id',
  localStorageTokenKey: 'event-planner-auth-token',
  invitedAttendeeEmailUrl: `https://localhost:5173${routePaths.eventDetailsInvitedAttendee.path}`,
} as const;
