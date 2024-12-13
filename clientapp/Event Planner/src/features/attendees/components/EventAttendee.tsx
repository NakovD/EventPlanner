import { useDeleteAttendee } from 'features/attendees/hooks/useDeleteAttendee';
import { IAttendee } from 'features/attendees/models/attendee';
import { Button } from 'features/common/button/Button';

interface IEventAttendeeProps {
  attendee: IAttendee;
}

export const EventAttendee = ({ attendee }: IEventAttendeeProps) => {
  const { deleteAttendee } = useDeleteAttendee({
    id: attendee.id,
    eventId: attendee.eventId,
  });
  return (
    <div className="border border-gray-200 rounded-lg shadow p-4">
      <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
        Name: {attendee.name}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Email: {attendee.email}
      </p>
      <p className="text-sm text-center my-3">Status: {attendee.status}</p>
      <p className="text-sm mt-3 text-right">
        Action: <Button label="Remove" onClick={deleteAttendee} className="ml-3" />
      </p>
    </div>
  );
};
