import { useAppContext } from 'AppContext';
import { useParams } from 'react-router-dom';

import { useAttendeeInternalUsersQuery } from './useAttendeeInternalUsersQuery';
import { useAttendeesQuery } from './useAttendeesQuery';

export const useManageAttendees = () => {
  const { id: eventId } = useParams();
  if (!eventId) throw new Error('No id found!');

  const invitedAttendeesQuery = useAttendeesQuery(eventId);

  const attendeeInternalUsersQuery = useAttendeeInternalUsersQuery();

  const { user } = useAppContext();

  return {
    eventId,
    user,
    invitedAttendeesQuery,
    attendeeInternalUsersQuery,
  };
};
