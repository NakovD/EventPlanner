import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { IExternalAttendeeForm } from 'features/attendees/form/models/externalAttendeeForm';
import { IExternalAttendeeRequest } from 'features/attendees/form/models/externalAttendeeRequest';
import { externalAttendeeFormValidationSchema } from 'features/attendees/form/validators/externalAttendeeFormValidationSchema';
import { Button } from 'features/common/button/Button';
import { TextField } from 'features/common/form/TextField';
import { useSnackBar } from 'features/common/snackbar/hooks/useSnackBar';
import { SnackBar } from 'features/common/snackbar/Snackbar';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useCreateMutation } from 'infrastructure/api/hooks/useCreateMutation';
import { constants } from 'infrastructure/constants';
import { propertyOf } from 'infrastructure/utilities/propertyOf';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface IExternalAttendeeFormProps {
  eventId: number;
}

export const ExternalAttendeeForm = ({ eventId }: IExternalAttendeeFormProps) => {
  const defaultValues: IExternalAttendeeForm = { attendeeEmail: '', attendeeName: '' };
  const { control, reset, handleSubmit } = useForm<IExternalAttendeeForm>({
    defaultValues,
    resolver: yupResolver(externalAttendeeFormValidationSchema),
  });

  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useCreateMutation<IExternalAttendeeRequest>({
    endpoint: endpoints.attendees.createNew,
  });

  const snackbarType = isSuccess && !isError ? 'success' : 'error';

  const { snackBarProps, openSnackBar } = useSnackBar({ type: snackbarType });

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries([
        getRequestsOptions.GetAllEventAttendees.queryKey,
        eventId,
      ]);
      reset(defaultValues);
      openSnackBar();
    }
  }, [isSuccess]);

  const onSubmit = handleSubmit((data) =>
    mutate({
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
      <SnackBar {...snackBarProps} />
      <Button className="mt-3" isSubmit={true} label="Submit" />
    </form>
  );
};
