import { useExternalAttendeeForm } from 'features/attendees/form/hooks/useExternalAttendeeForm';
import { Button } from 'features/common/button/Button';
import { TextField } from 'features/common/form/TextField';

interface IExternalAttendeeFormProps {
  eventId: number;
}

export const ExternalAttendeeForm = ({ eventId }: IExternalAttendeeFormProps) => {
  const { control, handleSubmit } = useExternalAttendeeForm({ eventId });
  return (
    <form className="flex flex-col gap-3 w-2/4" onSubmit={handleSubmit}>
      <TextField name="attendeeName" control={control} label="Attendee Name" />
      <TextField name="attendeeEmail" control={control} label="Attendee Email" />
      <Button className="mt-3" type="submit" label="Submit" />
    </form>
  );
};
