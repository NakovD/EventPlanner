import { useAppContext } from 'AppContext';
import { useValidIdParam } from 'infrastructure/hooks/useValidIdParam';

import { useAttendeeInternalUsersQuery } from './useAttendeeInternalUsersQuery';
import { useAttendeesQuery } from './useAttendeesQuery';

export const useManageAttendees = () => {
  const eventId = useValidIdParam();

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
