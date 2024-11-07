import { useAppContext } from 'AppContext';
import { EventProfile } from 'features/events/common/EventProfile';
import { useValidIdParam } from 'infrastructure/hooks/useValidIdParam';

import { useEventDetailsQuery } from './hooks/useEventDetailsQuery';

export const EventDetails = () => {
  const id = useValidIdParam();

  const { user } = useAppContext();

  const { data: event } = useEventDetailsQuery(id);

  const canEdit = user?.userId === event?.organizerId;

  return event && <EventProfile event={event} canEdit={canEdit} />;
};
