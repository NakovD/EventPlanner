import { CircularProgress } from '@mui/material';
import { EventForm } from 'features/events/form/EventForm';
import { IAllEventsEntity } from 'features/events/models/allEventsEntity';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useParams } from 'react-router-dom';

export const EventEdit = () => {
  const { id } = useParams();
  if (!id) throw new Error('No id found!');

  const { data: event, isLoading } = useReadQuery<IAllEventsEntity>({
    endpoint: replacePlaceholderWithId(getRequestsOptions.GetSingleEvent.endpoint, id),
    queryKey: [getRequestsOptions.GetSingleEvent.queryKey],
  });

  return (
    <div className="my-10">
      {isLoading ? (
        <CircularProgress color="secondary" />
      ) : (
        <EventForm
          event={event}
          eventId={event?.id.toString()}
          title="Edit your special event"
        />
      )}
    </div>
  );
};
