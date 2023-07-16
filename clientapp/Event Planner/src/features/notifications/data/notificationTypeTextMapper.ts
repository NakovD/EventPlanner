import { NotificationType } from 'features/notifications/enums/NotificationType';

export const notificationTypeTextMapper: {
  [keyof in NotificationType]: string;
} = {
  [NotificationType.EventInvite]: 'Event invitation:',
  [NotificationType.EventUpdate]: 'Event update:',
};
