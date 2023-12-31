import { useAppContext } from 'AppContext';
import { EventProfile } from 'features/events/common/EventProfile';
import { IAllEventsEntity } from 'features/events/models/allEventsEntity';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useParams } from 'react-router-dom';

export const EventDetails = () => {
  const { id } = useParams();
  if (!id) throw new Error('No id found!');

  const { user } = useAppContext();

  const { data: event } = useReadQuery<IAllEventsEntity>({
    endpoint: replacePlaceholderWithId(getRequestsOptions.GetSingleEvent.endpoint, id),
    queryKey: [getRequestsOptions.GetSingleEvent.queryKey],
  });

  const canEdit = user?.userId === event?.organizerId;

  return event && <EventProfile event={event} canEdit={canEdit} />;
};
