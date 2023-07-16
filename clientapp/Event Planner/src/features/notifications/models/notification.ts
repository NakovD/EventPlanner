import { NotificationType } from 'features/notifications/enums/NotificationType';

export interface INotification {
  id: number;
  description: string;
  createdAt: string;
  type: NotificationType;
  isReaded: boolean;
  eventId: number;
}
