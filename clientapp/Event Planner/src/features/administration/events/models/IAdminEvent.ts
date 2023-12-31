export interface IAdminEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  category: string;
  organizerName: string;
  description: string;
  attendees: number;
  isDeleted: boolean;
}
