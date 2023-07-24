import { AttendeeStatusType } from 'features/attendees/enums/attendeeStatusType';
import { IAttendeeStatusRequest } from 'features/attendees/models/attendeeStatusRequest';
import { Button } from 'features/common/button/Button';
import { useSnackBar } from 'features/common/snackbar/hooks/useSnackBar';
import { SnackBar } from 'features/common/snackbar/Snackbar';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useBlockingMutation } from 'infrastructure/api/hooks/useBlockingMutation';
import { useInvalidateQueries } from 'infrastructure/api/hooks/useInvalidateQueries';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface IEventAttendeeExternalControlsProps {
  eventId: number;
}

export const EventAttendeeExternalControls = ({
  eventId,
}: IEventAttendeeExternalControlsProps) => {
  const { id: encryptedData } = useParams();
  if (!encryptedData) throw new Error('No id was found!');

  const invalidate = useInvalidateQueries();

  const { mutate, isSuccess, isError } = useBlockingMutation<IAttendeeStatusRequest>({
    endpoint: replacePlaceholderWithId(
      endpoints.attendees.updateExternalStatus,
      encryptedData,
    ),
    queryKey: [getRequestsOptions.GetAllEventAttendees.queryKey, eventId],
    onSuccess: () => invalidate([getRequestsOptions.GetExternalAttendeeStatus.queryKey]),
  });

  const snackbarType = isSuccess && !isError ? 'success' : 'error';

  const { snackBarProps, openSnackBar } = useSnackBar({ type: snackbarType });

  useEffect(() => {
    if (isSuccess) openSnackBar();
  }, [isSuccess]);

  return (
    <div className="my-3 flex gap-2">
      <SnackBar {...snackBarProps} />
      <Button
        label={'I will come!'}
        onClick={() => mutate({ newStatus: AttendeeStatusType.Attending })}
      />
      <Button
        label={'Maybe'}
        onClick={() => mutate({ newStatus: AttendeeStatusType.Maybe })}
      />
      <Button
        label={'I wont come'}
        onClick={() => mutate({ newStatus: AttendeeStatusType.NotAttending })}
      />
    </div>
  );
};
