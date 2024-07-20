import { yupResolver } from '@hookform/resolvers/yup';
import { useExternalAttendeeMutation } from 'features/attendees/form/hooks/useExternalAttendeeMutation';
import { IExternalAttendeeForm } from 'features/attendees/form/models/externalAttendeeForm';
import { externalAttendeeFormValidationSchema } from 'features/attendees/form/validators/externalAttendeeFormValidationSchema';
import { constants } from 'infrastructure/constants';
import { useForm } from 'react-hook-form';

interface IUseExternalAttendeeFormOptions {
  eventId: number;
}

export const useExternalAttendeeForm = ({ eventId }: IUseExternalAttendeeFormOptions) => {
  const defaultValues: IExternalAttendeeForm = { attendeeEmail: '', attendeeName: '' };
  const { control, reset, handleSubmit } = useForm<IExternalAttendeeForm>({
    defaultValues,
    resolver: yupResolver(externalAttendeeFormValidationSchema),
  });

  const { mutate } = useExternalAttendeeMutation({ eventId });

  const onSubmit = handleSubmit((data) =>
    mutate(
      {
        name: data.attendeeName,
        email: data.attendeeEmail,
        eventId,
        emailUrl: constants.invitedAttendeeEmailUrl,
      },
      { onSuccess: () => reset(defaultValues) },
    ),
  );

  return {
    control,
    handleSubmit: onSubmit,
  };
};
