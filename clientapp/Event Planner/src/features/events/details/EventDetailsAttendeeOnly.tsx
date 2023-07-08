import { EventProfile } from 'features/events/common/EventProfile';
import { IAllEventsEntity } from 'features/events/models/allEventsEntity';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useParams } from 'react-router-dom';

export const EventDetailsAttendeeOnly = () => {
  const { id: encryptedData } = useParams();
  if (!encryptedData) throw new Error('No id was found!');

  const { data: event } = useReadQuery<IAllEventsEntity>({
    endpoint: replacePlaceholderWithId(
      getRequestsOptions.GetEventForAttendeeOnly.endpoint,
      encryptedData,
    ),
    queryKey: [getRequestsOptions.GetEventForAttendeeOnly.queryKey],
  });
  return event && <EventProfile event={event} canEdit={false} />;
};
