import { AttendeeStatusType } from 'features/attendees/enums/attendeeStatusType';

export interface IAttendeeStatusRequest {
  newStatus: AttendeeStatusType;
}
