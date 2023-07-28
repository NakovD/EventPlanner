import { IAttendeeUser } from 'features/attendees/models/attendeeUser';
import { IAttendeeUserRequest } from 'features/attendees/models/attendeeUserRequest';
import { Button } from 'features/common/button/Button';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { routePaths } from 'infrastructure/routing/routePaths';

interface IEventPotentialAttendeelProps {
  userData: IAttendeeUser;
  eventId: number;
}

export const EventPotentialAttendee = ({
  userData,
  eventId,
}: IEventPotentialAttendeelProps) => {
  const { mutate } = useSnackbarBlockingMutation<IAttendeeUserRequest>({
    endpoint: endpoints.attendees.createNew,
    queryKey: [getRequestsOptions.GetAllEventAttendees.queryKey, eventId],
  });

  const eventPath = `${window.location.origin}${routePaths.eventDetails.path}`;

  return (
    <div className="my-2 flex w-96 justify-between">
      <p>{userData.username}</p>
      <Button
        label="Invite"
        onClick={() =>
          mutate({
            userId: userData.id,
            email: userData.email,
            name: userData.username,
            eventId,
            emailUrl: eventPath,
          })
        }
      />
    </div>
  );
};
