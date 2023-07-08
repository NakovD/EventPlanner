import { yupResolver } from '@hookform/resolvers/yup';
import { IExternalAttendeeForm } from 'features/attendees/form/models/externalAttendeeForm';
import { IExternalAttendeeRequest } from 'features/attendees/form/models/externalAttendeeRequest';
import { externalAttendeeFormValidationSchema } from 'features/attendees/form/validators/externalAttendeeFormValidationSchema';
import { Button } from 'features/common/button/Button';
import { TextField } from 'features/common/form/TextField';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { useCreateMutation } from 'infrastructure/api/hooks/useCreateMutation';
import { constants } from 'infrastructure/constants';
import { propertyOf } from 'infrastructure/utilities/propertyOf';
import { useForm } from 'react-hook-form';

interface IExternalAttendeeFormProps {
  eventId: number;
}

export const ExternalAttendeeForm = ({ eventId }: IExternalAttendeeFormProps) => {
  const { control, handleSubmit } = useForm<IExternalAttendeeForm>({
    defaultValues: { attendeeEmail: '', attendeeName: '' },
    resolver: yupResolver(externalAttendeeFormValidationSchema),
  });

  const mutation = useCreateMutation<IExternalAttendeeRequest>({
    endpoint: endpoints.attendees.createNew,
  });

  const onSubmit = handleSubmit((data) =>
    mutation.mutate({
      name: data.attendeeName,
      email: data.attendeeEmail,
      eventId,
      emailUrl: constants.invitedAttendeeEmailUrl,
    }),
  );

  return (
    <form className="flex flex-col gap-3 w-2/4" onSubmit={onSubmit}>
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
