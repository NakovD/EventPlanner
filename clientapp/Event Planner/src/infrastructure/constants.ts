import { routePaths } from 'infrastructure/routing/routePaths';

export const constants = {
  idPlaceholder: ':id',
  invitedAttendeeEmailUrl: `https://localhost:5100${routePaths.eventDetailsInvitedAttendee.path}`,
} as const;
