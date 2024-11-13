import { useValidIdParam } from 'infrastructure/hooks/useValidIdParam';

import { useEventAttendeeExternalStatusMutation } from './useEventAttendeeExternalStatusMutation';

export const useEventAttendeeExternalControls = ({ eventId }: { eventId: number }) => {
  const linkId = useValidIdParam();

  return useEventAttendeeExternalStatusMutation({
    linkId,
    eventId: eventId.toString(),
  });
};
