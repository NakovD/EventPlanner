import { IAttendeeUser } from 'features/attendees/models/attendeeUser';
import { IAttendeeUserRequest } from 'features/attendees/models/attendeeUserRequest';
import { Button } from 'features/common/button/Button';
import { useSnackBar } from 'features/common/snackbar/hooks/useSnackBar';
import { SnackBar } from 'features/common/snackbar/Snackbar';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useAppMutation } from 'infrastructure/api/hooks/useAppMutation';
import { constants } from 'infrastructure/constants';
import { useEffect } from 'react';

interface IEventPotentialAttendeelProps {
  userData: IAttendeeUser;
  eventId: number;
}

export const EventPotentialAttendee = ({
  userData,
  eventId,
}: IEventPotentialAttendeelProps) => {
  const { mutate, isSuccess, isError } = useAppMutation<IAttendeeUserRequest>({
    endpoint: endpoints.attendees.createNew,
    queryKey: [getRequestsOptions.GetAllEventAttendees.queryKey, eventId],
  });

  const snackbarType = isSuccess && !isError ? 'success' : 'error';

  const { snackBarProps, openSnackBar } = useSnackBar({ type: snackbarType });

  useEffect(() => {
    if (isSuccess) openSnackBar();
  }, [isSuccess]);

  return (
    <div className="my-2 flex w-96 justify-between">
      <p>{userData.username}</p>
      <SnackBar {...snackBarProps} />
      <Button
        label="Invite"
        onClick={() =>
          mutate({
            userId: userData.id,
            email: userData.email,
            name: userData.username,
            eventId,
            emailUrl: constants.invitedAttendeeEmailUrl,
          })
        }
      />
    </div>
  );
};
