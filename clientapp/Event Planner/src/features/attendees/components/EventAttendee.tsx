import { Card, CardContent } from '@mui/material';
import { IAttendee } from 'features/attendees/models/attendee';
import { Button } from 'features/common/button/Button';

interface IEventAttendeeProps {
  attendee: IAttendee;
}

export const EventAttendee = ({ attendee }: IEventAttendeeProps) => {
  return (
    <Card className="border border-gray-200 rounded-lg shadow">
      <CardContent>
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          Name: {attendee.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Email: {attendee.email}
        </p>
        <p className="text-sm text-center my-3">Status: {attendee.status}</p>
        <p className="text-sm mt-3 text-right">
          Action: <Button label="Remove" className="ml-3" />
        </p>
      </CardContent>
    </Card>
  );
};
