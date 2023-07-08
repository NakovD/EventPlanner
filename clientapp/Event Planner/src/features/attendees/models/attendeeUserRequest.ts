import { IExternalAttendeeRequest } from 'features/attendees/form/models/externalAttendeeRequest';

export interface IAttendeeUserRequest extends IExternalAttendeeRequest {
  userId: string;
}
