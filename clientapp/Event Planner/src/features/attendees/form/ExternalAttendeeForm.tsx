import { useExternalAttendeeForm } from 'features/attendees/form/hooks/useExternalAttendeeForm';
import { IExternalAttendeeForm } from 'features/attendees/form/models/externalAttendeeForm';
import { Button } from 'features/common/button/Button';
import { TextField } from 'features/common/form/TextField';
import { propertyOf } from 'infrastructure/utilities/propertyOf';

interface IExternalAttendeeFormProps {
  eventId: number;
}

export const ExternalAttendeeForm = ({ eventId }: IExternalAttendeeFormProps) => {
  const { control, handleSubmit } = useExternalAttendeeForm({ eventId });
  return (
    <form className="flex flex-col gap-3 w-2/4" onSubmit={handleSubmit}>
      <TextField
        name={propertyOf<IExternalAttendeeForm>('attendeeName')}
        control={control}
        label="Attendee Name"
      />
      <TextField
        name={propertyOf<IExternalAttendeeForm>('attendeeEmail')}
        control={control}
        label="Attendee Email"
      />
      <Button className="mt-3" isSubmit={true} label="Submit" />
    </form>
  );
};
