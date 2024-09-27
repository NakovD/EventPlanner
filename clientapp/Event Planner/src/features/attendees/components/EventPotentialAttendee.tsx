import { IAttendeeUser } from 'features/attendees/models/attendeeUser';
import { Button } from 'features/common/button/Button';
import { routePaths } from 'infrastructure/routing/routePaths';

import { useCreateAttendeeMutation } from '../hooks/useCreateAttendeeMutation';

interface IEventPotentialAttendeelProps {
  userData: IAttendeeUser;
  eventId: number;
}

export const EventPotentialAttendee = ({
  userData,
  eventId,
}: IEventPotentialAttendeelProps) => {
  const { mutate } = useCreateAttendeeMutation(eventId);

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
