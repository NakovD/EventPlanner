import { IAttendeeUser } from 'features/attendees/models/attendeeUser';
import { IAttendeeUserRequest } from 'features/attendees/models/attendeeUserRequest';
import { Button } from 'features/common/button/Button';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { useCreateMutation } from 'infrastructure/api/hooks/useCreateMutation';
import { constants } from 'infrastructure/constants';

interface IEventPotentialAttendeelProps {
  userData: IAttendeeUser;
  eventId: number;
}

export const EventPotentialAttendee = ({
  userData,
  eventId,
}: IEventPotentialAttendeelProps) => {
  const mutation = useCreateMutation<IAttendeeUserRequest>({
    endpoint: endpoints.attendees.createNew,
  });
  return (
    <div className="my-2 flex w-96 justify-between">
      <p>{userData.username}</p>
      <Button
        label="Invite"
        onClick={() =>
          mutation.mutate({
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
