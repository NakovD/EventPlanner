import { IAttendee } from 'features/attendees/models/attendee';

interface IEventAttendeeProps {
  attendee: IAttendee;
}

export const EventAttendee = ({ attendee }: IEventAttendeeProps) => {
  return (
    <div>
      <p className="text-sm">Name: {attendee.name}</p>
      <p className="text-sm">Email: {attendee.email}</p>
      <p className="text-sm">Status: {attendee.status}</p>
      <p className="text-sm">Action: Remove</p>
    </div>
  );
};
