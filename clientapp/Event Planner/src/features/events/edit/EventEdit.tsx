import { CircularProgress } from '@mui/material';
import { EventForm } from 'features/events/form/EventForm';
import { useParams } from 'react-router-dom';
import { useEventDetailsQuery } from '../details/hooks/useEventDetailsQuery';

export const EventEdit = () => {
  const { id } = useParams();
  if (!id) throw new Error('No id found!');

  const { data: event, isLoading } = useEventDetailsQuery(id);

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
