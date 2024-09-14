import { useAppContext } from 'AppContext';
import { EventProfile } from 'features/events/common/EventProfile';
import { useParams } from 'react-router-dom';
import { useEventDetailsQuery } from './hooks/useEventDetailsQuery';

export const EventDetails = () => {
  const { id } = useParams();

  if (!id) throw new Error('No id found!');

  const { user } = useAppContext();

  const { data: event } = useEventDetailsQuery(id);

  const canEdit = user?.userId === event?.organizerId;

  return event && <EventProfile event={event} canEdit={canEdit} />;
};
