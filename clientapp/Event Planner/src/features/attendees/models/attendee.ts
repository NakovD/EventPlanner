export interface IAttendee {
  id: number;
  name: string;
  email: string;
  eventId: number;
  userId?: string;
  status: string;
}
